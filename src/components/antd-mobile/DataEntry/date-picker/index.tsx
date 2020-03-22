import React, { forwardRef } from 'react';
import { List, DatePicker as AntdDatePicker } from 'antd-mobile';
import { PropsType } from 'antd-mobile/es/date-picker';

import styles from '../index.less';

interface IProps extends PropsType  {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
}

const CustomItem = props => (
  <List.Item
    className={styles.customList}
    arrow={props.arrow}
    extra={
      <span
        style={{
          fontSize: '0.3rem',
          color: props.extra && props.extra.includes('请') ? '#bbb' : '#000',
        }}
      >
        {props.extra}
      </span>
    }
    onClick={props.onClick}
  >
    {props.children}
  </List.Item>
);

function DatePicker({ required, children, placeholder, ...rest }: IProps, ref: any) {
  return (
    <AntdDatePicker
      ref={ref}
      title={`选择${children}时间`}
      extra={placeholder}
      {...rest}
    >
      <CustomItem arrow="horizontal">
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </AntdDatePicker>
  );
}

export default forwardRef(DatePicker);
