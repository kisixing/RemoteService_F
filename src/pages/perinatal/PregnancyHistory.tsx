/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import _ from 'lodash';
import { generateUUID } from '@/utils';
import { Accordion, Modal, Toast } from 'antd-mobile';
import { Button, IconFont } from '@/components/antd-mobile';
import StepBar from './StepBar';
import GravidityForm from './GravidityForm';
import { ConnectState, ConnectProps } from '@/models/connect';
import styles from './styles.less'

// 读取配置文件
const configuration = window.configuration;
// 拷贝单个孕产史信息数据结构
const history = _.cloneDeep(configuration.history);

interface P {
  loading?: boolean
  dispatch: any,
}

interface S {};

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading.effects['global/getPregnancy'],
}))
class PregnancyHistory extends React.PureComponent<P, S> {

  state = {
    dataSource: [],
    activeKey: []
  };

  componentDidMount() {

  }

  accordion = (data: any[]) => {
    const activeKey = data.map(e => e.id);
    return (
      <Accordion activeKey={activeKey} onChange={this.onAccordionChange}>
        {data.map((item, i) => {
          return (
            <Accordion.Panel
              key={item.id}
              header={
                <div style={{ position: 'relative' }}>
                  <span style={{ color: '#ff6084', fontSize: '0.3rem', fontWeight: 600 }}>{`孕次记录 ${i + 1}`}</span>
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
                    <img style={{ width: '0.36rem' }} src={require('../../assets/icons/delete.png')} />
                  </span>
                </div>
              }
            >
              <GravidityForm
                key={item.id}
                wrappedComponentRef={(inst: any) => this[`formRef${item.id}`] = inst}
                fields={item.data}
              />
            </Accordion.Panel>
          );
        })}
      </Accordion>
    );
  };

  onAccordionChange = (key: string) => {
    console.log('object', key);
    this.setState({ activeKey: key })
  }

  add = () => {
    const { dataSource } = this.state;
    const newD = [...dataSource];
    newD.push({ id: `NEW${generateUUID(16)}`, data: [...history.data ] });
    this.setState({ dataSource: newD })
  };

  remove = (e: any, id: string) => {
    e.stopPropagation();
    Modal.alert('信息提示', `确定删除该孕次${id}信息？`, [
      { text: '取消', onPress: () => { }, style: 'default' },
      {
        text: '确定', onPress: () => {
          const { dataSource } = this.state;
          const newD = dataSource.filter(e => e.id !== id)
          this.setState({ dataSource: newD })
        }
      },
    ]);
  }

  getAllValues = () => {
    const { dataSource } = this.state;
    let result: any = [];
    let successed: boolean = false;
    dataSource.map((e: any, i: number) => {
      const inst: string = 'formRef' + e.id;
      const values: any = this.getValues(inst, i);

      successed = false;
      if (values) {
        successed = true;
        result.push(values)
      }
    });
    // 检测是否校验是否全部通过
    if (!successed) {
      console.log('get all values false!', result);
      return false
    }
    console.log('get all values success!', result);
    return result;
  }

  getValues = (inst: string, index: number) => {
    let result: object | boolean = {};
    this[inst].form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        Toast.info(`孕册记录${index + 1}未填写完整`, 2)
        return result = false;
      }
      console.log('孕产史信息', values);
      return result = { ...values }
    });
    return result;
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    const values = this.getAllValues();
    if (!values) {
      return;
    }
    dispatch({
      type: 'global/updatePregnancy',
      payload: { pregnancyHistories: values }
    }).then((res: any) => {
      if (res && res.id) {
        Modal.alert('提示', '孕产史信息保存成功！', [
          { text: '取消', onPress: () => {}, style: 'default' },
          { text: '确定', onPress: () => Router.push('/perinatal/perinatal') },
        ]);
      }
    })
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="page">
        <StepBar current={3} />
        {dataSource && dataSource.length > 0 ? (
          this.accordion(dataSource)
        ) : (
          <div className={styles.empty}> 暂无孕产史信息... </div>
        )}
        <div className="bottom_button">
          <Button type="primary" className={styles.addButton} onClick={this.add}>
            <IconFont type="add2" />
          </Button>
          <Button type="primary" disabled={dataSource && !dataSource.length} onClick={this.onSubmit}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default PregnancyHistory;
