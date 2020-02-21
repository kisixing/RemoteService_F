/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 孕产史信息
 */

import React from 'react';

import BackButton from '@/components/BackButton';
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
        <BackButton route="/perinatal-list">返回</BackButton>
      </div>
    );
  }
}

export default PregnancyHistory;
