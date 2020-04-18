import React, { forwardRef, useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import Popup from 'rmc-picker/lib/Popup';
import PopupContent from './PopupContent';

import styles from '../index.less';
import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

/**
 * 区分value中哪些是tab，哪些是other，分割tabs和text数值
 * @param options tabs+text
 * @param value selected tabs
 * @return 返回value值
 */
const separatedValues = (options: any[], value: any) => {
  // 判断value数据类型，分string和array
  let val = [];
  let tags: any = [];
  let text = '';
  if (Object.prototype.toString.call(value) === '[object String]') {
    val = value.split(',')
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    val = [...value]
  }
  val.forEach((i: string) => {
    const isTag = options.find((j: labelValue) => j.value === i);
    if (!isTag) {
      // text值不拆分，只当一个string
      text = i;
    } else {
      tags.push(i);
    }
  });
  return { tagsValue: tags, textValue: text };
};

/**
 * 区分value中哪些是tags，哪些是other，分割tabs和text数值
 * @param options tabs+text
 * @param value selected tabs
 * @return 返回label值
 */
const separatedLabels = (options: any[], value: any) => {
  // 判断value数据类型，分string和array
  let val: string[] = [];
  let tags: string[] = [];
  let text = '';
  if (!value) {
    return null;
  }
  if (Object.prototype.toString.call(value) === '[object String]') {
    val = value.split(',')
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    val = [...value]
  }
  val.forEach((i: string) => {
    const index = options.findIndex((j: labelValue) => j.value === i);
    if (index === -1) {
      // text值不拆分，只当一个string
      text = i;
    } else {
      const label = options[index]['label'];
      tags.push(label);
    }
  });
  return { tags: tags.join(','), text };
};

const CustomItem = ({ arrow, children, extra, value, onClick, options, disabled, error }: any) => {
  let text = '';
  const labels = separatedLabels(options, value);
  if (labels) {
    text = labels.text ? `${labels.tags}${labels.tags ? ',' : ''}${labels.text}` : labels.tags;
  }
  const color = text ? '#000' : error ? '#f50' : '#bbb';
  return (
    <List.Item
      className={styles.customList}
      arrow={arrow}
      extra={
        <span
          style={{ fontSize: '0.3rem', color }}
        >
          {text ? text : extra}
        </span>
      }
      onClick={() => (disabled ? null : onClick())}
    >
      {children}
    </List.Item>
  );
};

export interface labelValue {
	label: string
  value: string
  selected?: boolean
}
interface IProps {
  required?: boolean
  children?: any
  options?: labelValue[]
  value?: string[] | string
  onChange?: (value?: any) => void
  placeholder?: string
  valueFormat?: 'array' | 'string'
  disabled?: boolean
  error?: any
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
    disabled,
    error
  }: IProps,
  ref: any,
) {
  const [tagsValue, setTagsValue] = useState([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    const val = separatedValues(options, value);
    setTextValue(val.textValue);
    setTagsValue(val.tagsValue);
  }, [value]);

  const onOk = () => {
    let value: any = null;
    if (valueFormat === 'array') {
      value = [...tagsValue];
      if (textValue) {
        value = [...tagsValue, textValue];
      }
    }
    if (valueFormat === 'string') {
      value = [...tagsValue].join(',');
      if (textValue) {
        value = [...tagsValue, textValue].join(',');
      }
    }
    onChange(value);
  };

  const onDismiss = () => {};

  return (
    <Popup
      ref={ref}
      className={styles.popup}
      transitionName="rmc-picker-popup-slide-fade"
      maskTransitionName="rmc-picker-popup-fade"
      content={
        <PopupContent
          options={options}
          placeholder={children}
          tagsValue={tagsValue}
          textValue={textValue}
          onTagChange={setTagsValue}
          onTextChange={setTextValue}
        />
      }
      title={`选择${children}`}
      dismissText="取消"
      onDismiss={onDismiss}
      onOk={onOk}
      okText="确定"
    >
      <CustomItem
        arrow="horizontal"
        extra={placeholder}
        value={value}
        options={options}
        disabled={disabled}
        error={error}
      >
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  );
}

export default forwardRef(MixPicker);
