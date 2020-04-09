import React, { forwardRef, useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import Popup from 'rmc-picker/lib/Popup';
import PopupContent from './PopupContent';

import styles from '../index.less';
import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

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
          {typeof props.extra === 'object' ? props.extra.filter((e: any) => !!e).join(',') : props.extra}
        </span>
      }
      onClick={props.onClick}
    >
      {props.children}
    </List.Item>
  );
};

interface IProps {
  required?: boolean
  children?: any
  options: string[]
  value?: any[] | string
  multiple?: boolean
  onChange?: (value?: any) => void
  placeholder?: string
  valueFormat?: 'array' | 'string'
}

function MixPicker(
  {
    required,
    children,
    options = [],
    value,
    valueFormat = 'array',
    placeholder,
    onChange = () => {},
    multiple,
  }: IProps,
  ref: any,
) {
  const [cacheValue, setCacheValue] = useState(value);
  const [tabsValue, setTabsValue] = useState([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setCacheValue(value || []);
  }, []);

  const onOk = () => {
    onChange(cacheValue);
  };

  const onDismiss = () => {
    setCacheValue(value);
  };

  return (
    <Popup
      ref={ref}
      className={styles.popup}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      content={
        <PopupContent
          multiple={multiple}
          options={options}
          value={cacheValue}
          placeholder={children}
          onChange={setCacheValue}
        />
      }
      title={`选择${children}`}
      dismissText="取消"
      onDismiss={onDismiss}
      onOk={onOk}
      okText="确定"
    >
      <CustomItem arrow="horizontal" extra={value || placeholder}>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  );
}

export default forwardRef(MixPicker);
