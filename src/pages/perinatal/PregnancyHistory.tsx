/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';

import { Button, IconFont } from '@/components/antd-mobile';
import StepBar from './StepBar';

import styles from './styles.less'

interface P {
  loading?: boolean
}

interface S {

};

class PregnancyHistory extends React.PureComponent<P, S> {
  state = {
    cacheData: [],
  };

  accordion = () => {};

  add = () => {};

  render() {
    const { cacheData } = this.state;
    return (
      <div className="page">
        <StepBar current={3} />
        {cacheData && cacheData.length > 0 ? (
          this.accordion(cacheData)
        ) : (
          <div className={styles.empty}> 暂无孕产史信息... </div>
        )}
        <div className="bottom_button">
          <Button type="primary" className={styles.addButton}>
            <IconFont type="bianji2" />
          </Button>
          <Button type="primary" onClick={this.add}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default PregnancyHistory;
