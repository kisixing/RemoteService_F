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

export default class InputItem extends React.Component<IProps, IState> {
  handleChange = (event: any) => {
    const value = event.target.value;
    this.props.onchange(value)
  }
  render () {
    const { icon, extra, type, placeholder, value = '', onchange, ...rest } = this.props;
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
          type={type}
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
