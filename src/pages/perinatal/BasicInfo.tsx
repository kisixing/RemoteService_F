/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { Component } from 'react';
import { WingBlank } from 'antd-mobile';
import { Button } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import StepBar from './StepBar';
import styles from './styles.less'

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
        <div className={styles.formContainer}>form</div>
        <WingBlank>
          <Button type="primary">保存</Button>
          <BackButton route="/perinatal">返回</BackButton>
        </WingBlank>
      </div>
    );
  }
}

export default BasicInfo;
