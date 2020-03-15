/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 10:06:50
 * @Description: 遍历配置表，展示表单域
 */

import React from 'react';
import {
  List,
  InputItem,
  TextareaItem,
  StepperInput,
  Picker,
  DatePicker,
  Switch,
  Radio,
  MixPicker,
  AddressPicker,
} from '@/components/antd-mobile';
import styles from './FormFields.less';

interface IProps {
  form: any
  onChange?: any
  dataSource?: any[]
}

function FormFields({ form, onChange, dataSource = [] }: IProps) {

  const inputItem = (object: any) => {
    const { getFieldDecorator, getFieldError } = form;
    const { id, label, type, charactertype, hide, required, value, ...rest } = object;
    let placeholder = object.placeholder || type && type.includes('input') ? `请输入${label}` : `请选择${label}`;
    if (hide) {
      return null;
    }
    switch (type) {
      case 'text-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <InputItem {...object} id={id} key={id} type={charactertype} placeholder={placeholder}>
            {label}
          </InputItem>,
        );
      case 'textarea-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <TextareaItem id={id} key={id} placeholder={placeholder} {...object}>
            {label}
          </TextareaItem>,
        );
      case 'stepper-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <StepperInput id={id} key={id} {...object}>
            {label}
          </StepperInput>,
        );
      case 'switch':
        return getFieldDecorator(id, {
          initialValue: value,
          valuePropName: 'checked',
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Switch id={id} key={id} {...object}>
            {label}
          </Switch>,
        );
      case 'radio':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Radio id={id} key={id} {...object}>
            {label}
          </Radio>,
        );
      case 'picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Picker id={id} key={id} placeholder={placeholder} {...object}>
            {label}
          </Picker>,
        );
      case 'date-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <DatePicker id={id} key={id} placeholder={placeholder} {...object}>
            {label}
          </DatePicker>,
        );
      case 'mix-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <MixPicker id={id} key={id} placeholder={placeholder} {...object}>
            {label}
          </MixPicker>,
        );
      case 'address-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <AddressPicker id={id} key={id} placeholder={placeholder} {...object}>
            {label}
          </AddressPicker>,
        );
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
            <List key={i.id} className={styles.list}>
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
