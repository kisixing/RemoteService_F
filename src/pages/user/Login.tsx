/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-06 22:41:25
 * @Description: 登录页
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { stringify } from 'querystring';
import { createForm, formShape } from 'rc-form';
import { InputItem, Picker } from 'antd-mobile';

import { Button, List } from '@/components/antd-mobile';

const IDType = [
  {
    label: '二代身份证',
    value: '二代身份证',
},
{
    label: '港澳台居民居住证',
    value: '港澳台居民居住证',
},
{
    label: '回乡证',
    value: '回乡证',
},
{
    label: '台胞证',
    value: '台胞证',
},
{
    label: '护照',
    value: '护照',
},
];

interface P {
  form: any
}

interface S {

};

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@createForm()
class Bind extends Component<P, S> {
  static propTypes = {
    form: formShape,
  };

  state = {  };

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      mobile: '13657721210',
      captcha: '5566',
      IDType: ['二代身份证'],
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

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <form>
        <List>
          <InputItem
            {...getFieldProps('mobile', {
              rules: [{ required: false }],
            })}
            clear
            type="phone"
            placeholder="输入手机号码"
          >
            手机
          </InputItem>
          <InputItem
            {...getFieldProps('captcha')}
            clear
            placeholder="输入验证码"
          >
            验证码
          </InputItem>
          <Picker
            cols={1}
            extra="请选择证件类型"
            data={IDType}
            title="请选择医院"
            {...getFieldProps('IDType', {
              rules: [{ required: true }],
            })}
          >
            <List.Item arrow="horizontal">证件类型</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('IDNo', {
              rules: [{ required: true }],
            })}
            clear
            type="digit"
            placeholder="输入身份证"
          >
            证件号码
          </InputItem>
          <List.Item>
            <Button
              type="primary"
              style={{ marginTop: '1rem' }}
              onClick={this.onSubmit}
            >
              登录
            </Button>
          </List.Item>
        </List>
      </form>
    );
  }
}

export default Bind;
