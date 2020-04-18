import React, { forwardRef } from 'react';
import { List, DatePicker as AntdDatePicker } from 'antd-mobile';
import moment from 'moment';
import { PropsType } from 'antd-mobile/es/date-picker';

import styles from '../index.less';

interface IProps extends PropsType  {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
  valueFormat?: 'string' | 'date'
  error?: any
  format: string
}

const CustomItem = ({ arrow, error, extra, onClick, children }: any) => {
  console.log('date picker', error);
  const color = extra && extra.includes('请') && !error ? '#bbb' : error ? '' : '#000';
  return (
    <List.Item
      className={styles.customList}
      arrow={arrow}
      error={error}
      extra={
        <span style={{fontSize: '0.3rem', color }}>
          {extra}
        </span>
      }
      onClick={onClick}
    >
      {children}
    </List.Item>
  );
};

function DatePicker({
  required,
  children,
  placeholder,
  value,
  mode,
  error,
  format = 'YYYY-MM-DD',
  valueFormat = 'date',
  onChange = () => {},
  ...rest
}: IProps, ref: any) {
  // value格式处理
  const transInit = (time: any) => {
    let val = undefined;
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

  const handleChange = (value: Date) => {
    let result: any = value;
    if (valueFormat === 'string') {
      result = moment(value).format(format);
    }
    return onChange(result);
  };

  return (
    <AntdDatePicker
      ref={ref}
      title={`选择${children}时间`}
      extra={placeholder}
      value={transInit(value)}
      onOk={handleChange}
      mode={mode}
      format={value => moment(value).format(format)}
      {...rest}
    >
      <CustomItem arrow="horizontal" error={error}>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </AntdDatePicker>
  );
}

export default forwardRef(DatePicker);
