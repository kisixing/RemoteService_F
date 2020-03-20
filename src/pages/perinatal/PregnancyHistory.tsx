/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';

import { Button } from '@/components/antd-mobile';
import StepBar from './StepBar';

interface P {
  loading?: boolean;
}

interface S {

};

class PregnancyHistory extends React.Component<P, S> {
  render() {
    return (
      <div className="page">
        <StepBar current={3} />
        孕产史信息
        <div className="bottom_button">
          <Button type="primary">确定</Button>
        </div>
      </div>
    );
  }
}

export default PregnancyHistory;
