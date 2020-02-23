/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-06 22:41:25
 * @Description: 登录页/绑定页面
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { stringify } from 'querystring';
import { createForm } from 'rc-form';

import InputItem from './components/InputItem';
import Picker from './components/Picker';
import Footer from '@/components/Footer';
import { Button, IconFont } from '@/components/antd-mobile';
import styles from './Login.less';

const IDType =
  ['二代身份证', '港澳台居民居住证', '回乡证', '台胞证', '护照', '其他'].map(e => ({ label: e, value: e }));

interface P {
  form: any
}

interface S {
  count: number
  disabled: boolean
};

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@createForm()
class Login extends Component<P, S> {
  timer: any = null;
  state = {
    count: 0,
    disabled: false,
  };

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      mobile: '13657721210',
      captcha: '5566',
      // IDType: '二代身份证',
      IDNo: '110101199003071348',
    })
  }

  onSubmit = () => {
    const { form } = this.props;
    form.validateFields((error: Array<any>, value: object) => {
      console.log(error, value);
      if (error) {
        return;
      }
      const queryString = stringify({ ...value });
      router.push(`/user/register?${queryString}`)
    });
  }

  countDown = (second: number) => {
    this.setState({
      disabled: true,
      count: second,
    });
    this.timer = setInterval(() => {
      let count = this.state.count;
      if (count === 1) {
        clearInterval(this.timer);
        this.setState({ disabled: false });
      } else {
        this.setState({
          disabled: true,
          count: --count,
        });
      }
    }, 1000);
  };

  render() {
    const { count, disabled } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.logo} />
          <h1>登录</h1>
        </div>
        <form className={styles.content} onSubmit={this.onSubmit}>
          {getFieldDecorator('mobile', {
            rules: [{ required: true }]
          })(
            <InputItem
              icon={<IconFont type="mobile1" size="0.44rem" />}
              type='number'
              placeholder="请输入手机号"
            />
          )}
          {getFieldDecorator('captcha', {
            rules: [{ required: true }]
          })(
            <InputItem
              icon={<IconFont type="yanzhengma1" size="0.4rem" />}
              extra={
                <Button
                  size="small"
                  type="primary"
                  disabled={disabled}
                  style={{ width: '1.92rem', height: '100%', lineHeight: '.88rem', borderRadius: 0 }}
                  onClick={() => this.countDown(60)}
                >
                {disabled ? <b style={{ fontSize: '.34rem', color: '#000' }}>{count}</b> : '获取验证码'}
                </Button>
            }
              type='number'
              placeholder="请输入验证码"
            />
          )}
          {getFieldDecorator('IDType', {
            initialValue: '二代身份证',
            rules: [{ required: true }]
          })(
            <Picker
              cols={1}
              extra="请选择证件类型"
              placeholder="请选择证件类型"
              title="请选择医院"
              options={IDType}
              icon={<IconFont type="duomeitiicon-" size="0.44rem" />}
            />
          )}
          {getFieldDecorator('IDNo', {
            rules: [{ required: true }]
          })(
            <InputItem
              icon={<IconFont type="cc-card" size="0.44rem" />}
              type='number'
              placeholder="请输入证件号码"
            />
          )}
          <Button type="primary" onClick={this.onSubmit} style={{ margin: '.6rem 0' }}>
            登录
          </Button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Login;
