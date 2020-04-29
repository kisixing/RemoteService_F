/*
 * @Description: radio和input组件的组合
 * @Author: Zhong Jun
 * @Date: 2020-04-08 18:08:32
 */

import React, { forwardRef } from 'react';
import RadioPicker from '../radio-picker';
import TextInput from '../text-input';

// 数据说明
// label --> label1&label2 value --> { smoke: true, smokeNote: 12 }
interface IProps {
  name: string
  children: string
  value?: object
  onChange?: (values: any) => void
  props?: any[]
}

function RadioInput(
  { name, children, value = {}, onChange = () => {}, props = [] }: IProps,
  ref: any,
) {
  const labels = props.map((e: any) => e.label);
  const ids = props.map((e: any) => e.id);

  const visible = value[ids[0]] && value[ids[0]] !== '无' && value[ids[0]] !== '否';

  const handleRadio = (val: any) => {
    let result = { ...value };
    result[ids[0]] = val;
    onChange(result);
  };

  const handleText = (val: string) => {
    let result = { ...value };
    result[ids[1]] = val;
    onChange(result);
  };

  return (
    <span ref={ref}>
      <RadioPicker
        {...props[0]}
        name={props[0]['id']}
        value={value[props[0]['id']]}
        onChange={handleRadio}
      >
        {labels[0]}
      </RadioPicker>
      {visible ? (
        <TextInput
          {...props[1]}
          name={props[1]['id']}
          placeholder={props[1]['placeholder'] || `请输入${labels[1]}`}
          value={value[props[1]['id']]}
          onChange={handleText}
        >
          {labels[1]}
        </TextInput>
      ) : null}
    </span>
  );
}

export default forwardRef(RadioInput);
