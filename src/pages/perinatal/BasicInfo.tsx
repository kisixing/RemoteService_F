/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { WingBlank } from 'antd-mobile';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Button, BackButton } from '@/components/antd-mobile';
import FormFields from './FormFields';
import StepBar from './StepBar';
import styles from './styles.less';

import { basic } from './config';



interface P {
  loading?: boolean;
  form: any
}

interface S {

};

@connect(({ global, loading }) => ({
  pregnancy: global.currentPregnancy,
  loading: loading,
}))
class BasicInfo extends Component<P, S> {
  render() {
    const { form } = this.props;
    return (
      <div className="page">
        <StepBar current={1} />
        <form className={styles.form}>
          <FormFields form={form} dataSource={basic.data} />
        </form>
        <div className={styles.buttonView}>
          <Button type="primary">保存</Button>
          <BackButton route="/perinatal">返回</BackButton>
        </div>
      </div>
    );
  }
}

export default createDOMForm()(BasicInfo);
