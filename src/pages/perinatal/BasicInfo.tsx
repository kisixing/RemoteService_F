/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 基本信息
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Modal, ActivityIndicator } from 'antd-mobile';
import { Button } from '@/components/antd-mobile';
import { getPregnancy, updatePregnancy } from '@/services/user';
import { ConnectState, ConnectProps } from '@/models/connect';
import { checkIdCard } from '@/utils';
import { getRealData, assignmentData, submittedData } from './utils';
import FormFields from './FormFields';
import StepBar from './StepBar';

import styles from './styles.less';

// 读取配置文件
const { basic } = window.configuration;
// 基本信息配置
const dataSource = basic.data;

interface P {
  loading?: boolean;
  dispatch: any,
  form: any
  currentPregnancy?: any
}

interface S {
  values: object
  isLoading: boolean
};

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading.effects['global/getPregnancy'],
}))
class BasicInfo extends PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.initValue();
  }

  initValue = () => {
    const { form, currentPregnancy } = this.props;
    getPregnancy(currentPregnancy.id).then((res: any) => {
      this.setState({ isLoading: false });
      if (res && res.id) {
        const values = getRealData(res, dataSource);
        /**
         * 身份证信息自动获取
         * 如果出生年月、年龄、国籍、籍贯没有值，则根据身份证id自动计算赋值
         */
        const ID_info: any = values.idNO && values.idNO.length === 18 ? checkIdCard(values.idNO) : {};
        const partnerIdNO_info: any = values.partnerIdNO && values.partnerIdNO.length === 18 ? checkIdCard(values.partnerIdNO) : {};
        const newValues = {
          ...values,
          dob: ID_info.birth,
          age: ID_info.age,
          nationality: ID_info.nationality,
          nativeplace: ID_info.province,
          partnerDob: partnerIdNO_info.birth,
          partnerAge: partnerIdNO_info.age,
          partnerNationality: partnerIdNO_info.nationality,
          partnerNativeplace: partnerIdNO_info.province,
        };

        console.log('基本信息初始值：', values, newValues);
        form.setFieldsValue({ ...newValues });
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
      const newValues = submittedData(values, dataSource);
      console.log('基本信息', values, newValues);
      dispatch({
        type: 'global/updatePregnancy',
        payload: newValues,
      }).then((res: any) => {
        if (res && res.id) {
          Modal.alert('提示', '基本信息保存成功！', [
            { text: '返回', onPress: () => Router.goBack(), style: 'default' },
            { text: '下一步', onPress: () => Router.push('/perinatal/current-pregnancy') },
          ]);
        }
      });
    });
  };

  onChange = (id: string, value: any) => {
    const { form } = this.props;
    if (id === 'idNO' && value && value.length === 18) {
      const ID_info = checkIdCard(value);
      form.setFieldsValue({
        dob: ID_info.birth,
        age: ID_info.age,
        nationality: ID_info.nationality,
        nativeplace: ID_info.province,
      });
    }
    if (id === 'partnerIdNO' && value && value.length === 18) {
      const partnerIdNO_info = checkIdCard(value)
      form.setFieldsValue({
        partnerDob: partnerIdNO_info.birth,
        partnerAge: partnerIdNO_info.age,
        partnerNationality: partnerIdNO_info.nationality,
        partnerNativeplace: partnerIdNO_info.province
      });
    }
  }

  /**
   * 身份证信息自动获取
   * 如果出生年月、年龄、国籍、籍贯没有值，则根据身份证id自动计算赋值
   */
  automatchID = () => {
    let result = {};

    return result;
  }

  render() {
    const { form } = this.props;
    return (
      <div className="page">
        <StepBar current={1} />
        <form className={styles.form}>
          <FormFields form={form} dataSource={dataSource} onChange={this.onChange} />
        </form>
        <div className="bottom_button">
          <Button type="primary" onClick={this.onSubmit}>
            保存
          </Button>
        </div>
        <ActivityIndicator toast text="Loading..." animating={this.state.isLoading} />
      </div>
    );
  }
}

export default createDOMForm()(BasicInfo);
