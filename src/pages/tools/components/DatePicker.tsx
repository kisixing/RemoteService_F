/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-08 13:01:41
 * @Description: 时间选择组件
 */

import React from 'react';
import { DatePicker as ANTDDatePicker } from 'antd-mobile';
import { IconFont } from '@/components/antd-mobile'
import { PropsType } from 'antd-mobile/es/date-picker';
import styles from './DatePicker.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const min = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 30);
const max = new Date(nowTimeStamp);

interface DatePickerPropsType extends PropsType {
  height?: string
}

interface ChildrenIProps {
  extra?: string
  height?: string
  onClick?: () => void
}

// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, height = '0.86rem', onClick }: ChildrenIProps) => (
  <div onClick={onClick} className={styles.list} style={{ height }}>
    <span>{extra}</span>
    <IconFont type="date" size="0.36rem" color="#8d8dac" />
  </div>
);

function DatePicker({
  minDate = min,
  maxDate = max,
  title="选择日期",
  extra="请选择日期",
  height="0.88rem",
  ...rest
}: DatePickerPropsType) {
  return (
    <div>
      <ANTDDatePicker minDate={minDate} maxDate={maxDate} title={title} extra={extra} {...rest}>
        <CustomChildren height={height} />
      </ANTDDatePicker>
    </div>
  );
}

export default DatePicker
