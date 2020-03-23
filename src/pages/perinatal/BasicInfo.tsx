/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Button } from '@/components/antd-mobile';
import { getPregnancy, updatePregnancy } from '@/services/user';
import { ConnectState, ConnectProps } from '@/models/connect';
import { getKeys } from '@/utils/utils';
import FormFields from './FormFields';
import StepBar from './StepBar';
import { basic } from './config';

import styles from './styles.less';

const keys = getKeys(basic.data);

interface P {
  loading?: boolean;
  form: any
  currentPregnancy?: any
}

interface S {
  values: object
};

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading,
}))
class BasicInfo extends PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
    };
  }

  componentDidMount() {
    this.initValue();
  }

  initValue = () => {
    const { form, currentPregnancy } = this.props;
    getPregnancy(currentPregnancy.id).then((res: any) => {
      if (res && res.id) {
        const values = _.pick(res, keys);
        console.log('基本信息初始值：', values);
        form.setFieldsValue({ ...values });
        this.setState({ values });
      }
    });
  };

  onSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        return;
      }
      console.log('基本信息', values);
    });
  };

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
