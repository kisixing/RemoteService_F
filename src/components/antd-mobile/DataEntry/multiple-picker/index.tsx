/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-06 14:14:49
 * @Description: multiple select多选组件
 *
 */

import React, { forwardRef, useEffect, useState } from 'react';
import { List } from 'antd-mobile';
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

const CustomItem = ({ arrow, children, extra, value, onClick, options, disabled }: any) => {
  // value值约定格式
  // [{ label: 'tag1', value: true/false }, ..., { label: '其他', value: true/false, note: '其他说明' }]
  let text = '';
  const labels = separatedLabels(options, value);
  if (labels) {
    text = labels.text ? `${labels.tags}${labels.tags ? ',' : ''}${labels.text}` : labels.tags;
  }
  if (value && value.length === 0) {
    text = '无';
  }
  if (value && value.length === 1 && value[0]['label'] === '其他') {
    text = value[0]['note'];
  }
  return (
    <List.Item
      className={styles.customList}
      arrow={arrow}
      extra={
        <span
          style={{
            fontSize: '0.3rem',
            color: value ? '#000' : '#bbb',
          }}
        >
          {value ? text : extra}
        </span>
      }
      onClick={() => (disabled ? null : onClick(true))}
    >
      {children}
    </List.Item>
  );
};

export interface labelValue {
  label: string;
  value: string;
  selected?: boolean;
}
interface IProps {
  disabled?: boolean
  required?: boolean
  children?: any
  options: labelValue[]
  value?: any[]
  onChange: any
  placeholder?: string
}

function MultiplePicker(
  {
    required,
    disabled,
    children,
    options,
    value = [],
    placeholder,
    onChange,
  }: IProps,
  ref: any,
) {
  const [visible, setVisible] = useState(false);
  const [tagsValue, setTagsValue] = useState([]);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    // value = [{ label: '' , value: true }， { label: 'otherNote', value: '其他疾病' }]
    const tags: any = value.filter((e: any) => e.label !== 'otherNote');
    const text = value.filter((e: any) => e.label === 'otherNote');
    setTagsValue(tags);
    setTextValue(text.length && text[0]['value']);
  }, []);

  const onOk = () => {
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
      >
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </CustomItem>
    </Popup>
  );
}

export default forwardRef(MultiplePicker);
