import React, { forwardRef } from 'react';
import { List, Picker as AntdPicker } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';

import options from '../address-picker/cascader-address-options';

import styles from '../index.less';

interface IProps extends PickerPropsType {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
  pickerType?: any
  addressPicker?: boolean
  valueFormat?: 'string' | 'array' | 'number' | 'labelInValue'
  value: any
  options?: any[]
}

const CustomItem = (props: any) => {
  return (
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
};

function Picker(
  {
    required,
    children,
    options = [],
    placeholder,
    title,
    addressPicker,
    valueFormat = 'array',
    onChange = () => {},
    value,
    ...rest
  }: IProps,
  ref: any,
) {
  // 是否选择地址组件
  let dataSource = options;
  if (addressPicker) {
    dataSource = options;
  }
  // value格式转化
  // 判断value字符类型，默认array同antd-mobile
  let correctValue = [];
  if (Object.prototype.toString.call(value) === '[object Array]') {
    correctValue = [...value];
    if (value[0] && value[0]['value']) {
      correctValue = value.map((e: any) => e.value);
    }
  }
  if (Object.prototype.toString.call(value) === '[object Number]') {
    correctValue = [value];
  }
  if (Object.prototype.toString.call(value) === '[object String]') {
    correctValue = value.split(',');
  }

  const handleChange = (value: any) => {
    let val = value;
    if (valueFormat === 'string') {
      val = value.join(',');
    }
    if (valueFormat === 'number') {
      val = value[0];
    }
    if (valueFormat === 'labelInValue') {
      const duplicate = dataSource.filter((e: any) => {
        const isInclude = value.includes(e.value);
        return isInclude;
      });
      console.log('object', duplicate);
      val = [...duplicate];
      console.log('picker123', val);
    }
    onChange(val);
  };

  return (
    <AntdPicker
      ref={ref}
      data={dataSource}
      title={`选择${title || children}`}
      extra={placeholder}
      value={correctValue}
      onOk={handleChange}
      {...rest}
    >
      <CustomItem arrow="horizontal">
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </AntdPicker>
  );
}

export default forwardRef(Picker);
