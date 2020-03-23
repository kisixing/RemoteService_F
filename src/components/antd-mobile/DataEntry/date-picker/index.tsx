import React, { forwardRef } from 'react';
import { List, DatePicker as AntdDatePicker } from 'antd-mobile';
import moment from 'moment';
import { PropsType } from 'antd-mobile/es/date-picker';

import styles from '../index.less';

interface IProps extends PropsType  {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
}

const CustomItem = (props: any) => (
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

function DatePicker(
  { required, children, placeholder, value, format = 'YYYY-MM-DD HH:mm', ...rest }: IProps,
  ref: any,
) {
  // value格式处理
  const transInit = (time: any) => {
    let val = null;
    if (!time) {
      val = null;
    }
    if (moment.isDate(time)) {
      val = value;
    }
    if (moment.isMoment(time)) {
      val = time.toDate();
    }
    if (typeof time == 'string') {
      val = new Date(time);
    }
    return val;
  };
  const onOk = () => {};

  return (
    <AntdDatePicker
      ref={ref}
      title={`选择${children}时间`}
      extra={placeholder}
      value={transInit(value)}
      onOk={onOk}
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
