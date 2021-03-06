/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { generateUUID } from '@/utils';
import { Accordion, Modal, Toast } from 'antd-mobile';
import { Button, IconFont } from '@/components/antd-mobile';
import { getPregnancy, updatePregnancy } from '@/services/user';
import StepBar from '../StepBar';
import GravidityForm from './GravidityForm';
import { ConnectState, ConnectProps } from '@/models/connect';
import styles from '../styles.less';

interface P {
  loading?: boolean;
  dispatch: any;
  form: any;
  currentPregnancy?: any;
}

interface S {
  dataSource?: any[];
  activeKey?: any[];
  values?: any[];
}

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading.effects['global/getPregnancy'],
}))
class PregnancyHistory extends React.PureComponent<P, S> {
  state = {
    dataSource: [],
    activeKey: [],
    values: [],
  };

  componentDidMount() {
    const {
      currentPregnancy: { id },
    } = this.props;
    this.initValue(id);
  }

  initValue = (id: string) => {
    getPregnancy(id).then((res: any) => {
      if (res && res.id) {
        const values: any[] = res.pregnancyHistories || [];
        console.log('孕产史信息初始值：', values);
        // 初始化Accordion
        let dataSource = values.map((e: any) => ({ id: e.id }));
        let ids = values.map((e: any) => e.id.toString());
        if (!values.length) {
          ids = [];
        }
        this.setState({
          values,
          dataSource,
          activeKey: ids,
        });
      }
    });
  };

  accordion = (data: any[]) => {
    const { activeKey } = this.state;
    return (
      <Accordion activeKey={activeKey} onChange={this.onAccordionChange}>
        {data.map((item, i) => {
          return (
            <Accordion.Panel
              key={item.id}
              header={
                <div style={{ position: 'relative' }}>
                  <span
                    style={{ color: '#ff6084', fontSize: '0.3rem', fontWeight: 'bold' }}
                  >{`孕次记录 ${i + 1}`}</span>
                  <span
                    style={{
                      width: '0.88rem',
                      height: '0.88rem',
                      background: '#fff',
                      textAlign: 'center',
                      position: 'absolute',
                      right: '-0.6rem',
                    }}
                    onClick={e => this.remove(e, item.id)}
                  >
                    <img
                      style={{ width: '0.36rem' }}
                      src={require('../../../assets/icons/delete.png')}
                    />
                  </span>
                </div>
              }
            >
              <GravidityForm
                id={item.id}
                index={i + 1}
                wrappedComponentRef={(inst: any) => (this[`formRef${item.id}`] = inst)}
                values={this.state.values[i] || {}}
              />
            </Accordion.Panel>
          );
        })}
      </Accordion>
    );
  };

  onAccordionChange = (key: string[]) => {
    this.setState({ activeKey: key });
  };

  add = () => {
    const { dataSource } = this.state;
    const newD = [...dataSource];
    newD.push({ id: `NEW${generateUUID(16)}` });
    const activeKey = newD.map((e: any) => e.id.toString());
    this.setState({ dataSource: newD, activeKey });
  };

  remove = (e: any, id: string) => {
    e.stopPropagation();
    Modal.alert('信息提示', `确定删除该孕次${id}信息？`, [
      { text: '取消', onPress: () => {}, style: 'default' },
      {
        text: '确定',
        onPress: () => {
          const { dataSource } = this.state;
          const newD = dataSource.filter(e => e.id !== id);
          this.setState({ dataSource: newD });
        },
      },
    ]);
  };

  getAllValues = () => {
    const { dataSource } = this.state;
    let result: any = [];
    let successed: boolean = false;
    dataSource.map((e: any, i: number) => {
      const inst: string = 'formRef' + e.id;
      // const values: any = this.getValues(inst, i);
      const values = this[inst].getValues();
      successed = false;
      if (values) {
        successed = true;
        result.push(values);
      }
    });
    // 检测是否校验是否全部通过
    if (!successed) {
      console.log('get all values false!', result);
      return false;
    }
    console.log('get all values success!', result);
    return result;
  };

  getValues = (inst: string, index: number) => {
    let result: object | boolean = {};
    // console.log('object', this[inst]);

    // CustomizedForm
    this[inst].props.form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        Toast.info(`孕册记录${index + 1}未填写完整`, 2);
        return (result = false);
      }
      console.log('孕产史信息', values);
      return (result = { ...values });
    });
    return result;
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const values = this.getAllValues();
    if (!values) {
      return;
    }
    dispatch({
      type: 'global/updatePregnancy',
      payload: { pregnancyHistories: values },
    }).then((res: any) => {
      if (res && res.id) {
        Modal.alert('提示', '孕产史信息保存成功！', [
          { text: '取消', onPress: () => {}, style: 'default' },
          { text: '确定', onPress: () => Router.push('/perinatal') },
        ]);
      }
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="page">
        <StepBar current={3} />
        {dataSource && dataSource.length > 0 ? (
          this.accordion(dataSource)
        ) : (
          <div className={styles.empty}>
            <h4>暂无孕产史信息...</h4>
            <span className={styles.tip}>
              若以前曾经怀孕，点击右下角圆形“+”图标按钮补充孕产史信息，若未曾怀孕，直接跳过本页...
            </span>
          </div>
        )}
        <div className="bottom_button">
          <Button type="warning" className={styles.addButton} onClick={this.add}>
            <IconFont type="add" size=".54rem" />
          </Button>
          {dataSource && dataSource.length ? (
            <Button type="primary" onClick={this.onSubmit}>
              保存
            </Button>
          ) : (
            <Button onClick={() => Router.push('/')}>返回首页</Button>
          )}
        </div>
      </div>
    );
  }
}

export default PregnancyHistory;
