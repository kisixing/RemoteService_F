/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Button } from '@/components/antd-mobile';
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
class BasicInfo extends PureComponent<P, S> {

  onSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        return;
      }
      console.log('基本信息', values)
    });
  }

  render() {
    const { form } = this.props;
    return (
      <div className="page">
        <StepBar current={1} />
        <form className={styles.form}>
          <FormFields form={form} dataSource={basic.data} />
        </form>
        <div className="bottom_button">
          <Button type="primary" onClick={this.onSubmit}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

export default createDOMForm()(BasicInfo);
