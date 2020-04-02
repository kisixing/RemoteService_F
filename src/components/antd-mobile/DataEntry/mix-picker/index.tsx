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
          {typeof props.extra === 'object' ? props.extra.filter(e => !!e).join(',') : props.extra}
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
  data: string[]
  value?: any[]
  multiple?: boolean
  onChange?: any // React.Dispatch<any> | () => void
  placeholder?: string
}

function MixPicker(
  { required, children, data, value, placeholder, onChange, multiple }: IProps,
  ref: any,
) {
  const [visible, setVisible] = useState(false);
  const [cacheValue, setCacheValue] = useState(value);

  useEffect(() => {
    setCacheValue(value || []);
  }, [])

  const onOk = () => {
    onChange(cacheValue);
  };

  const onOpen = () => setVisible(true);

  const onDismiss = () => {
    setCacheValue(value);
  };

  return (
    <Popup
      className={styles.popup}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      content={
        <PopupContent
          multiple={multiple}
          data={data}
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
      value={value}
    >
      <CustomItem arrow="horizontal" extra={value && value.length ? value : placeholder}>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  );
}

export default forwardRef(MixPicker);
