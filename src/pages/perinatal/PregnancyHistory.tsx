/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';
import { Accordion, Modal } from 'antd-mobile';
import { Button, IconFont } from '@/components/antd-mobile';
import StepBar from './StepBar';
import GravidityForm from './GravidityForm';
import { history } from './config';

import styles from './styles.less'

interface P {
  loading?: boolean
}

interface S {
  dataSource: any[]
};

class PregnancyHistory extends React.PureComponent<P, S> {
  state = {
    dataSource: []
  };

  componentDidMount() {
    this.setState({
      dataSource: [],
    });
  }

  accordion = (data: any[]) => {
    return (
      <Accordion defaultActiveKey={['1']}>
        {data.map((item, i) => {
          return (
            <Accordion.Panel
              key={(i + 1).toString()}
              header={
                <div style={{ position: 'relative' }}>
                  {`孕次 ${i + 1}`}
                  <span
                    style={{ width: '0.88rem', height: '0.88rem', background: '#fff', textAlign: 'center', position: 'absolute', right: '-0.6rem' }}
                    onClick={(e) => this.remove(e, item.id)}
                  >
                    <img style={{ width: '0.36rem' }} src={require('../../assets/icons/delete.png')} />
                  </span>
                </div>
              }
            >
              <GravidityForm fields={item.data} />
            </Accordion.Panel>
          );
        })}
      </Accordion>
    );
  };

  add = () => {
    const { dataSource } = this.state;
    const newD = [...dataSource];
    newD.push({ id: `NEW${Math.floor(Math.random() * 100 + 1)}`, ...history });
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
          <Button type="primary" disabled={dataSource && !dataSource.length} onClick={this.add}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default PregnancyHistory;
