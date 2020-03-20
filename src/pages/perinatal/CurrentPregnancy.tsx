/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 本孕信息
 */

import React from 'react';
import { Button } from '@/components/antd-mobile';

import StepBar from './StepBar';

interface P {
  loading?: boolean;
}

interface S {

};

class CurrentPregnancy extends React.Component<P, S> {
  render() {
    return (
      <div className="page">
        <StepBar current={2} />
        本孕信息
        <div className="bottom_button">
          <Button type="primary">确定</Button>
        </div>
      </div>
    );
  }
}

export default CurrentPregnancy;
