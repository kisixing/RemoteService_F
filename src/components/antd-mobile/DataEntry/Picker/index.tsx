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

function Picker({ required, children, data, placeholder, title, addressPicker, ...rest }: IProps, ref: any) {
  let dataSource = data;
  if (addressPicker) {
    dataSource = options;
  }
  return (
    <AntdPicker
      ref={ref}
      data={dataSource}
      title={`选择${title || children}`}
      extra={placeholder || `请选择${title}`}
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
