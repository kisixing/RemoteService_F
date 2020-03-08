/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-08 13:01:41
 * @Description: 时间选择组件
 */

import React from 'react';
import { DatePicker as ANTDDatePicker } from 'antd-mobile';
import { PropsType } from 'antd-mobile/es/date-picker';
import styles from './DatePicker.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const min = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 30);
const max = new Date(nowTimeStamp);

interface DatePickerPropsType extends PropsType {}

interface ChildrenIProps {
  extra?: string
  onClick?: () => void
}

// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick }: ChildrenIProps) => (
  <div onClick={onClick} className={styles.list}>
    {extra}
  </div>
);

function DatePicker({
  minDate = min,
  maxDate = max,
  title="选择日期",
  extra="请选择日期",
  ...rest
}: DatePickerPropsType) {
  return (
    <div>
      <ANTDDatePicker minDate={minDate} maxDate={maxDate} title={title} extra={extra} {...rest}>
        <CustomChildren />
      </ANTDDatePicker>
    </div>
  );
}

export default DatePicker
