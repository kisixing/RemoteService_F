/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-06 14:14:49
 * @Description: multiple select多选组件
 */

import React, { forwardRef, useEffect, useState } from 'react';
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
      onClick={() => props.disabled ? null : props.onClick(true)}
    >
      {props.children}
    </List.Item>
  );
};

interface IProps {
  disabled?: boolean
  required?: boolean
  children?: any
  data: string[]
  value?: any[]
  valueForm?: 'string' | 'array'
  onChange: () => void
  placeholder?: string
}

function MultiplePicker({ required, disabled, children, data, value = [], placeholder, onChange }: IProps, ref: any) {
  const [visible, setVisible] = useState(false);
  const [tabsValue, setTabsValue] = useState([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    // value = [{ label: '' , value: true }， { label: 'otherNote', value: '其他疾病' }]
    const tabs: any = value.filter((e: any) => e.label !== 'otherNote');
    const text = value.filter((e: any) => e.label === 'otherNote');
    setTabsValue(tabs);
    setTextValue(text.length && text[0]['value']);
  }, [])

  const onOk = () => {
    setVisible(false)
  };

  const onDismiss = () => setVisible(false);

  return (
    <Popup
      className={styles.popup}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      content={
        <PopupContent
          dataSource={data}
          tabsvalue={tabsValue}
          textValue={textValue}
          placeholder={`其他${children}`}
          onTabsChange={setTabsValue}
          onTextChange={setTextValue}
          onDismiss={onDismiss}
        />
      }
      visible={visible}
      value={value}
      onDismiss={onDismiss}
      onOk={onOk}
      title={`选择${children}`}
      dismissText="取消"
      okText="确定"
    >
      <CustomItem arrow="horizontal" onClick={setVisible} extra={value || placeholder} disabled={disabled}>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  )
}

export default forwardRef(MultiplePicker);
