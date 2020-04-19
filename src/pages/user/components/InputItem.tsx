/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-22 19:27:40
 * @Description: input 登录页特有组件
 */

import React from 'react';
import classnames from 'classnames';

import styles from './InputItem.less';

interface IProps {
  icon?: string | React.ReactNode
  extra?: string | React.ReactNode
  type?: string
  placeholder?: string
  value?: any
  onChange?: () => void
  [propName: string]: any;
}

interface IState {}

// 手机号码格式转化为 344 格式 （188 3886 9199）
function phoneSeparated(phoneNumber: string) {
  // 去掉字符串中所有空格
  let str = phoneNumber.replace(/\s+/g, '');
  const len = str.length;
  switch (true) {
    case len > 11:
      str = str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7, 4);
      break;
    case len > 7:
      str = str.substr(0, 3) + ' ' + str.substr(3, 4) + ' ' + str.substr(7);
      break;
    case len > 3:
      str = str.substr(0, 3) + ' ' + str.substr(3);
      break;
    default:
      str = str;
  }
  return str;
}

export default class InputItem extends React.Component<IProps, IState> {
  handleChange = (event: any) => {
    event.preventDefault();
    const { type, onChange = () => {} } = this.props;
    let value = event.target.value;
    if (value) {
      value.trim()
    }
    if (type === 'phone') {
      value = phoneSeparated(value);
      if (value.length > 13) {
        return;
      }
    }
    onChange(value)
  }
  render () {
    const { icon, extra, type, placeholder, value = '', onChange, ...rest } = this.props;
    const t = type === 'phone' ? 'tel' : type;

    return (
      <div className={styles.inputItem}>
        {icon ? (
          <span className={styles.label}>{icon}</span>
        ) : null}
        <input
          className={classnames(
            [styles.input], {
              [styles.hasIcon]: !!icon,
              [styles.hasExtra]: !!extra,
            })}
          type={t}
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value}
          {...rest}
        />
        {extra ? (
          <div className={styles.extra}>{extra}</div>
        ) : null}
      </div>
    );
  }
}
