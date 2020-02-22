/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-22 19:27:40
 * @Description: input 登录页特有组件
 */

import React from 'react';
import classnames from 'classnames';

import styles from './InputItem.less';

interface Iprops {
  icon?: string | React.ReactNode
  extra?: string | React.ReactNode
  type?: string
  placeholder?: string
  [propName: string]: any;
}

export default function InputItem(props: Iprops) {
  const { icon, extra, type, placeholder, ...rest } = props;
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
        {...rest}
      />
      {extra ? (
        <div className={styles.extra}>{extra}</div>
      ) : null}
    </div>
  )
}
