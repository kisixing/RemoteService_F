/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-06 22:41:25
 * @Description: 绑定、初始建档页面
 */

import React, { Component } from 'react';
import { connect } from 'dva';
// import { parse } from 'querystring';
import { createForm, formShape } from 'rc-form';
import { ButtonProps } from 'antd/es/button';
import { InputItem, DatePicker, Picker } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN';

import { Button, List } from '@/components/antd-mobile';
import Footer from '@/components/Footer';
import styles from './Register.less';


const nowTimeStamp = Date.now();
const minDate = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 365);
const maxDate = new Date(nowTimeStamp + 1e7);
const hospitals = [
  {
    label: '华侨医院',
    value: '华侨医院',
  },
  {
    label: '广东省妇幼',
    value: '广东省妇幼',
  },
  {
    label: '天河区妇幼',
    value: '天河区妇幼',
  },
  {
    label: '天河区中医院',
    value: '天河区中医院',
  },
];

interface P extends ButtonProps {
  location: any,
  circular?: boolean;
  form?: any
}

type S = {

};

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@createForm()
class Register extends Component<P, S> {
  static propTypes = {
    form: formShape,
  };

  state = {  };

  componentDidMount() {
    const { location: { query }, form } = this.props;
    form.setFieldsValue({
      mobile: query.phone,
      IDNo: query.IDNo,
      hospital: ['华侨医院'],
      userName: '李师师',
      gesmoc: new Date('2019-10-01')
    })
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>新建孕册</div>
        <form className={styles.content}>
          <List>
            <InputItem
              {...getFieldProps('userName', {
                rules: [{ required: false }],
              })}
              clear
              type="phone"
              placeholder="输入姓名"
            >
              姓名
            </InputItem>
            <DatePicker
              {...getFieldProps('gesmoc', {
                rules: [{ required: false }],
              })}
              clear
              mode="date"
              locale={zhCN}
              title="选择末次月经"
              extra="请输入末次月经"
              minDate={minDate}
              maxDate={maxDate}
            >
              <List.Item arrow="horizontal">末次月经</List.Item>
            </DatePicker>
            <InputItem
              {...getFieldProps('mobile', {
                initialValue: '13657721212',
                rules: [{ required: false }],
              })}
              clear
              type="phone"
              placeholder="输入手机号码"
              disabled={false}
            >
              手机号
            </InputItem>
            <InputItem
              {...getFieldProps('IDNo', {
                initialValue: '450301198709213381',
                rules: [{ required: false }],
              })}
              clear
              type="digit"
              placeholder="输入身份证"
              disabled={false}
            >
              证件号码
            </InputItem>
            <Picker
              cols={1}
              extra="请选择医院"
              data={hospitals}
              title="请选择医院"
              {...getFieldProps('hospital', {
                rules: [{ required: false }],
              })}
            >
              <List.Item arrow="horizontal">建档医院</List.Item>
            </Picker>
            <List.Item>
              <Button type="primary" style={{ marginTop: '1rem' }}>新建孕册</Button>
            </List.Item>
          </List>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Register;
