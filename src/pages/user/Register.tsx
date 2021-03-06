/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-06 22:41:25
 * @Description: 初始建档页面
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
// import { parse } from 'querystring';
import { createForm } from 'rc-form';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { InputItem, DatePicker, Toast, /* Picker */ } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN';

import { Button, List } from '@/components/antd-mobile';
import Footer from '@/components/Footer';
import styles from './Register.less';
import { getValueKeys } from '../perinatal/utils';

const nameRes = /(^(?:[\u4e00-\u9fa5·]{2,16})$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/;
const nowTimeStamp = Date.now();
const minDate = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 365);
const maxDate = new Date(nowTimeStamp + 1e7);
// const hospitals = ['暨南大学附属第一医院', '中山大学附属第一医院', '中山大学附属第二医院', '中山大学附属第三医院', '广东省妇幼保健院', '南方医科大学珠江医院', '南方医科大学南方医院'].map(e => ({ label: e, value: e }));

interface P {
  dispatch: any
  location: any
  circular?: boolean
  form?: any
  submitting: boolean
  mpuid: string
}

type S = {}

@connect(({ loading, global }: ConnectState) => ({
  submitting: loading.effects['user/newPregnancy'],
  mpuid: global.mpuid
}))
@createForm()
class Register extends Component<P, S> {
  state = {};

  componentDidMount() {
    const {
      location: { query },
      form,
    } = this.props;
    form.setFieldsValue({
      mobile: query.mobile,
      idNo: query.idNo,
    });
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const {
      mpuid,
      form,
      location: { query },
    } = this.props;
    form.validateFields((error: Array<any>, value: any) => {
      if (error) {
        return Toast.info('请输入完整的信息。', 2);
      }
      if (!nameRes.test(value.name)) {
        return Toast.info('请输入规范的姓名，纯中文（可用·分隔）或英文', 2);
      }
      const data = {
        ...value,
        mpuid,
        mobile: value.mobile,
        telephone: value.mobile,
        lmp: moment(value.LMP).format('YYYY-MM-DD'),
        idType: Number(query.idType),
        // TODO 可考虑计算出预产期进行提交，
      };
      this.createPregnancy(data);
    });
  };

  createPregnancy = (data: object) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/newPregnancy',
      payload: data,
    }).then((res: any) => {
      // 新建孕册成功
      if (res && res.id) {
        router.replace('/');
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, submitting } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>新建孕册</div>
        <form className={styles.content} onSubmit={this.onSubmit}>
          <List>
            {getFieldDecorator('name', {
              rules: [{ required: true }],
            })(
              <InputItem clear type="text" placeholder="请输入姓名">
                姓名
              </InputItem>,
            )}
            {getFieldDecorator('LMP', {
              rules: [{ required: true }],
            })(
              <DatePicker
                mode="date"
                locale={zhCN}
                title="选择末次月经"
                extra="请选择末次月经"
                minDate={minDate}
                maxDate={maxDate}
              >
                <List.Item>末次月经</List.Item>
              </DatePicker>,
            )}
            {getFieldDecorator('mobile', {
              rules: [{ required: true }],
            })(
              <InputItem clear disabled type="phone" placeholder="请输入手机号码">
                手机号
              </InputItem>,
            )}
            {getFieldDecorator('idNo', {
              rules: [{ required: true }],
            })(
              <InputItem clear disabled type="text" placeholder="请输入身份证">
                证件号码
              </InputItem>,
            )}
            {/* {getFieldDecorator('hospital', {
              initialValue: '',
              rules: [{ required: true }]
            })(
              <Picker
                cols={1}
                extra="请选择医院"
                data={hospitals}
                title="请选择医院"
              >
                <List.Item arrow="horizontal">建档医院</List.Item>
              </Picker>
            )} */}
            <List.Item>
              <Button
                type="primary"
                loading={submitting}
                onClick={this.onSubmit}
                style={{ marginTop: '1rem' }}
              >
                新建孕册
              </Button>
            </List.Item>
          </List>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Register;
