/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 10:06:50
 * @Description: 遍历配置表，展示表单域
 */

import React from 'react';
import { List, InputItem } from 'antd-mobile';

interface IProps {
  form: any
  onChange?: any
  dataSource?: any[]
}

function FormFields({ form, onChange, dataSource = [] }: IProps) {

  const inputItem = (object: any) => {
    const { getFieldDecorator, getFieldError } = form;
    const { id, label, type, charactertype, hide, required, value } = object;
    let placeholder = object.placeholder || type && type.includes('input') ? `请输入${label}` : `请选择${label}`;
    if (hide) {
      return null;
    }
    switch (type) {
      case 'text-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(<InputItem id={id} key={id} type={type} placeholder={placeholder}>{label}</InputItem>);
      default:
        return;
    }
  };

  return (
    <>
      {dataSource.map((i: { id: string; children: any[] }) => {
        const children = i.children;
        if (children) {
          return (
            <List key={i.id} style={{ marginBottom: '0.3rem' }}>
              {children.map((j: object) => {
                return inputItem(j);
              })}
            </List>
          );
        }
        return null;
      })}
    </>
  );
}

export default FormFields;
