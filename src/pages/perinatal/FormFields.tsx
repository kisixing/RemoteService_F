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
  RadioInput,
  PickerInput,
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
    const {
      id,
      label,
      type = 'input',
      charactertype,
      hide = false,
      required,
      value,
      pattern,
      patternMessage,
      length,
      maxLength,
      minLength,
      max,
      min,
      ...rest
    } = object;

    let placeholder = object.placeholder || type.includes('input') ? `请输入${label}` : `请选择${label}`;
    let rules = [];
    if (required && type !== 'multiple-picker') {
      rules.push({ required: required, message: placeholder })
    }
    if (pattern) {
      rules.push({ pattern, message: patternMessage ? patternMessage : `请输入符合规则的${label}` })
    }
    if (length) {
      rules.push({ len: length, message: `${label}允许输入的最大长度为${len}` })
    }
    if (maxLength) {
      rules.push({ max: maxLength, message: `${label}的最大值为${max}` })
    }
    if (minLength) {
      rules.push({ min: minLength, message: `${label}的最新值为${min}` })
    }

    if (hide) {
      return null;
    }
    switch (type) {
      case 'text-input':
        return getFieldDecorator(id, {
          initialValue: value,
          validateFirst: true,
          rules: rules,
        })(
          <InputItem
            key={id}
            required={required}
            type={charactertype}
            placeholder={placeholder}
            maxLength={maxLength}
            max={max}
            min={min}
            error={getFieldError(id)}
            onChange={e => onChange(id, e)}
            {...rest}
          >
            {label}
          </InputItem>,
        );
      case 'textarea-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: rules,
        })(
          <TextareaItem
            key={id}
            required={required}
            placeholder={placeholder}
            error={getFieldError(id)}
            {...rest}
          >
            {label}
          </TextareaItem>,
        );
      case 'stepper-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <StepperInput
            key={id}
            required={required}
            max={max}
            min={min}
            error={getFieldError(id)}
            {...rest}
          >
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
          <Radio
            key={id}
            required={required}
            charactertype={charactertype}
            error={getFieldError(id)}
            {...rest}
          >
            {label}
          </Radio>,
        );
      case 'picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <Picker
            key={id}
            required={required}
            placeholder={placeholder}
            error={getFieldError(id)}
            {...rest}
          >
            {label}
          </Picker>,
        );
      case 'date-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <DatePicker
            key={id}
            required={required}
            placeholder={placeholder}
            error={getFieldError(id)}
            onChange={e => onChange(id, e)}
            {...rest}
          >
            {label}
          </DatePicker>,
        );
      case 'mix-picker':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <MixPicker
            key={id}
            required={required}
            placeholder={placeholder}
            error={getFieldError(id)}
            {...rest}
          >
            {label}
          </MixPicker>,
        );
      case 'multiple-picker':
        const _rules = required ? [{
          validator: (rule, value, callback) => {
            const res = required ? !value : !!value;
            if (res) {
              callback(`${placeholder}!`)
            }
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback()
          } }] : [];
        return getFieldDecorator(id, {
          initialValue: value,
          rules: _rules,
        })(
          <MultiplePicker
            key={id}
            required={required}
            placeholder={placeholder}
            error={getFieldError(id)}
            {...rest}
          >
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
      case 'radio-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <RadioInput key={id} id={id} {...rest}>
            {label}
          </RadioInput>,
        );
      case 'picker-input':
        return getFieldDecorator(id, {
          initialValue: value,
          rules: [{ required: required, message: `${placeholder}!` }],
        })(
          <PickerInput key={id} id={id} {...rest}>
            {label}
          </PickerInput>,
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
