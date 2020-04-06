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
  MultiplePicker,
  AddressPicker,
} from '@/components/antd-mobile';
import styles from './FormFields.less';

interface IProps {
  form: any
  onChange?: (id: string, value: any) => void
  dataSource?: any[]
}

function FormFields({ form, onChange = () => {}, dataSource = [] }: IProps) {

  const inputItem = (object: any) => {
    const { getFieldDecorator, getFieldError } = form;
    const { id, label, type = 'input', charactertype, hide = false, required, value, ...rest } = object;
    let placeholder = object.placeholder || type.includes('input') ? `请输入${label}` : `请选择${label}`;

    if (hide) {
      return null;
    }
    switch (type) {
      case 'text-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <InputItem
            key={id}
            required={required}
            type={charactertype}
            placeholder={placeholder}
            onChange={e => onChange(id, e)}
            {...rest}
          >
            {label}
          </InputItem>,
        );
      case 'textarea-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <TextareaItem key={id} required={required} placeholder={placeholder} {...rest}>
            {label}
          </TextareaItem>,
        );
      case 'stepper-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <StepperInput key={id} required={required} {...rest}>
            {label}
          </StepperInput>,
        );
      case 'switch':
        return getFieldDecorator(id, {
          initialValue: value,
          valuePropName: 'checked',
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Switch key={id} required={required} {...rest}>
            {label}
          </Switch>,
        );
      case 'radio':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Radio key={id} required={required} charactertype={charactertype} {...rest}>
            {label}
          </Radio>,
        );
      case 'picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Picker key={id} required={required} placeholder={placeholder} {...rest}>
            {label}
          </Picker>,
        );
      case 'date-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <DatePicker key={id} required={required} placeholder={placeholder} onChange={e => onChange(id, e)} {...rest}>
            {label}
          </DatePicker>,
        );
      case 'mix-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <MixPicker key={id} required={required} placeholder={placeholder} {...rest}>
            {label}
          </MixPicker>,
        );
      case 'multiple-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <MultiplePicker key={id} required={required} placeholder={placeholder} {...rest}>
            {label}
          </MultiplePicker>,
        );
      case 'address-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <AddressPicker key={id} required={required} placeholder={placeholder} {...rest}>
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
