/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { Component } from 'react';

import BackButton from '@/components/BackButton';
import StepBar from './StepBar';

interface P {
  loading?: boolean;
}

interface S {

};

class BasicInfo extends Component<P, S> {
  render() {
    return (
      <div className="page">
        <StepBar current={1} />
        基本信息
        <BackButton route="/perinatal-list">返回</BackButton>
      </div>
    );
  }
}

export default BasicInfo;
