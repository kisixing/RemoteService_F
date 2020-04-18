/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-06 14:14:49
 * @Description: multiple select多选组件
 *
 */

import React, { forwardRef, useEffect, useState } from 'react';
import { List, Toast } from 'antd-mobile';
import Popup from 'rmc-picker/lib/Popup';
import PopupContent from './PopupContent';

import styles from '../index.less';
import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

/**
 * 区分value中哪些是tags，哪些是other，分割tabs和text数值
 * @param options tabs+text
 * @param value selected tabs
 * @return 返回label值
 */
const concatLabels = (values: any) => {
  // 判断value数据类型，分string和array
  let text = '';
  if (values && values.length === 0) {
    text = '无';
  }
  if (values && values.length) {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element.value === 'other') {
        text = `${text}${text ? ',' : ''}${element.note}`;
      } else {
        text = `${text}${text ? ',' : ''}${element.label}`;
      }
    }
  }
  return text;
};

const CustomItem = ({ arrow, children, extra, value, onClick, options, disabled, error }: any) => {
  // value值约定格式
  // [{ label: '高血压', value: 'hypertension' }, ..., { label: '其他', value: 'other', note: '其他说明' }]
  const text = concatLabels(value);
  const color = text ? '#000' : error ? '#f50' : '#bbb';
  return (
    <List.Item
      className={styles.customList}
      arrow={arrow}
      extra={
        <span style={{ fontSize: '0.3rem', color }}>
          {text ? text : extra}
        </span>
      }
      onClick={() => (disabled ? null : onClick(true))}
    >
      {children}
    </List.Item>
  );
};

export interface LabelValue {
  label: string
  value: string
  selected?: boolean
}
interface IProps {
  disabled?: boolean
  required?: boolean
  children?: any
  options: LabelValue[]
  value?: any
  onChange: any
  placeholder?: string
  error?: any
}

function MultiplePicker(
  {
    required,
    disabled,
    children,
    options,
    value,
    placeholder,
    onChange,
    error
  }: IProps,
  ref: any,
) {
  const [visible, setVisible] = useState(false);
  const [tagsValue, setTagsValue] = useState(null);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    // value = [
    //   { label: '高血压' , value: 'hypertension' },
    //   { label: '其他', value: 'other', note: '其他疾病史一' },
    // ]
    let tags = value;
    let text = '';
    if (value) {
      const index = value.findIndex((e: LabelValue) => e.value === 'other');
      if (index > -1) {
        // 存在其他选项
        text = value[index]['note'];
      }
    }
    setTagsValue(tags);
    setTextValue(text);
  }, [value]);

  const onOk = () => {
    if (tagsValue) {
      let value = tagsValue;
      // 取other在tagsValue的位置
      const index = value.findIndex((e: LabelValue) => e.value === 'other');
      if (index > -1) {
        if (!textValue) {
          return Toast.info('请输入其他内容...')
        }
        value[index]['note'] = textValue;
      }
      onChange(value);
    }

    setVisible(false);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <Popup
      ref={ref}
      className={styles.popup}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      content={
        <PopupContent
          options={options}
          tagsValue={tagsValue}
          textValue={textValue}
          placeholder={`其他${children}`}
          onTagsChange={setTagsValue}
          onTextChange={setTextValue}
          onChange={onChange}
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
      <CustomItem
        arrow="horizontal"
        onClick={setVisible}
        extra={placeholder}
        value={value}
        disabled={disabled}
        error={error}
      >
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  );
}

export default forwardRef(MultiplePicker);
