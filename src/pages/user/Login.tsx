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
import { Toast, Modal } from 'antd-mobile';

import { ConnectState } from '@/models/connect';
import InputItem from './components/InputItem';
import Picker from './components/Picker';
import Footer from '@/components/Footer';
import { Button, IconFont } from '@/components/antd-mobile';
import styles from './Login.less';

const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
const IDType = [
  { label: '二代身份证', value: 0 },
  { label: '港澳台居民居住证', value: 1 },
  { label: '回乡证', value: 2 },
  { label: '台胞证', value: 3 },
  { label: '护照', value: 4 },
  { label: '其他', value: 5 },
];
// ['二代身份证', '港澳台居民居住证', '回乡证', '台胞证', '护照', '其他'].map(e => ({ label: e, value: e }));

interface P {
  form: any
  dispatch: any
  mpuid?: string
}

interface S {
  count: number
  disabled: boolean
};

@connect(({ loading, global }: ConnectState) => ({
  submitting: loading.effects['user/bindUser'],
  mpuid: global.mpuid,
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
      // mobile: '13657721210',
      // captcha: '5566',
      // idType: '二代身份证',
      // idNo: '110101199003071348',
    });
  }

  getCaptcha = () => {
    const {
      dispatch,
      form: { getFieldValue },
    } = this.props;
    const mobile = getFieldValue('mobile');
    if (!reg.test(mobile)) {
      return Toast.info('请输入正确的手机号码!');
    }
    dispatch({
      type: 'user/getCaptcha',
      payload: { mobile },
    }).then((res: any) => {
      if (res && res.status === 1) {
        // 获取验证码成功，开启定时器
        this.countDown(60);
      }
    });
  };

  onSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFields((error: Array<any>, values: any) => {
      console.log(error, values);
      if (error) {
        // 数据错误提示
        if (!reg.test(values.mobile)) {
          return Toast.info('请输入正确的手机号码!', 2);
        }
        if (!values.captcha || values.captcha.length < 3) {
          return Toast.info('请输入四位数字的短信验证码!', 2);
        }
        // TODO 身份证验证规则
        // if (values.idNo > 0) {
        //   return Toast.info('请输入正确的证件号码！', 2);
        // }
      }
      dispatch({
        type: 'user/bindUser',
        payload: values,
      }).then((res: any) => {
        if (res && res.id) {
          // 有绑定信息，返回最近的一个档案
          // 弹出alter提示框，1.新建、2.直接进入主页
          return this.alter(res, values);
        }
        if (res && res.status) {
          // 返回错误信息
          if (res.status === 400) {
            return Toast.info('验证码失效');
          }
          return;
        }
        if (!res) {
          // TODO 没有返回任何信息
          // 没有任何的个人绑定信息，跳转新建档案页进行新建
          const queryString = stringify({ ...values });
          return router.push(`/user/register?${queryString}`);
        }
      });
    });
  };

  // 点击绑定（调用put接口 更新孕册的mpuid）
  bindUser = (data: object) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/bindUserMp',
      payload: data,
    });
  };

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

  /**
   * @params {object} result 请求结果
   * @params {object} query 输入参数
   * @memberof Login
   */
  alter = (result: any = {}, query: object = {}) => {
    Modal.alert(
      '绑定信息',
      // tslint:disable-next-line: jsx-wrap-multiline
      <div>
        <p>姓 名：{result.name}</p>
        <p>末次月经：{result.gesweek}</p>
      </div>,
      [
        {
          text: '新建孕册',
          onPress: () => router.replace(`/user/register?${stringify({ ...query })}`),
          style: 'default',
        },
        {
          text: '确认绑定',
          onPress: () => this.bindUser({ id: result.id, mpuid: this.props.mpuid }),
        },
      ],
    );
  };

  render() {
    const { count, disabled } = this.state;
    const { submitting, getFieldDecorator } = this.props.form;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.logo} />
          <h1>登录</h1>
        </div>
        <form className={styles.content} onSubmit={this.onSubmit}>
          {getFieldDecorator('mobile', {
            rules: [
              { required: true, message: '请输入手机号码' },
              { pattern: /^1\d{10}$/, message: '请输入合法的手机号码' },
            ],
          })(
            <InputItem
              icon={<IconFont type="mobile1" size="0.44rem" />}
              type="number"
              placeholder="请输入手机号"
            />,
          )}
          {getFieldDecorator('captcha', {
            rules: [
              { required: true, message: '请输入手机号码' },
              { pattern: /^[a-zA-Z0-9]{1,20}$/, message: '请输入数字和英文字母' },
            ],
          })(
            <InputItem
              icon={<IconFont type="yanzhengma1" size="0.4rem" />}
              extra={
                <Button
                  size="small"
                  type="primary"
                  disabled={disabled}
                  style={{
                    width: '2.2rem',
                    height: '100%',
                    lineHeight: '.84rem',
                    borderRadius: 0,
                  }}
                  onClick={this.getCaptcha}
                >
                  {disabled ? (
                    <>
                      重新发送<b style={{ fontSize: '.30rem', color: '#000' }}>{count}</b>
                    </>
                  ) : (
                    '获取验证码'
                  )}
                </Button>
              }
              type="number"
              placeholder="请输入验证码"
            />,
          )}
          {getFieldDecorator('idType', {
            initialValue: 0,
            rules: [{ required: true }],
          })(
            <Picker
              cols={1}
              extra="请选择证件类型"
              placeholder="请选择证件类型"
              title="请选择医院"
              options={IDType}
              icon={<IconFont type="duomeitiicon-" size="0.44rem" />}
            />,
          )}
          {getFieldDecorator('idNo', {
            rules: [{ required: true }],
          })(
            <InputItem
              icon={<IconFont type="cc-card" size="0.44rem" />}
              type="number"
              placeholder="请输入证件号码"
            />,
          )}
          <Button
            type="primary"
            loading={submitting}
            onClick={this.onSubmit}
            style={{ margin: '.6rem 0' }}
          >
            登录
          </Button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Login;
