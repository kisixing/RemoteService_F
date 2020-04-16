/*
 * @Description: radio和input组件的组合
 * @Author: Zhong Jun
 * @Date: 2020-04-08 18:08:32
 */

import React, { forwardRef, useState } from 'react';
import Picker from '../picker';
import RadioPicker from '../radio-picker';
import MixPicker from '../mix-picker';
import TextInput from '../text-input';

// 数据说明
// label --> label1&label2 value --> { smoke: true, smokeote: 12 }
interface IProps {
  id: string
  children: string;
  value?: object;
  onChange?: (value: object) => void;
  props?: any[]
}

function PickerInput({ id, children, value = {}, props = [], onChange = () => {} }: IProps, ref: any) {
  // 拆分label，分布赋值给picker和input
  const labels = props.map((e: any) => e.label);
  const ids = props.map((e: any) => e.id);

  const visible = value[ids[0]] && value[ids[0]] !== '无' && value[ids[0]] !== '否';

  const handlePicker = (val: any) => {
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
    <span>
      {props[0]['type'] === 'radio' ? (
        <RadioPicker {...props[0]} value={value[ids[0]]} onChange={handlePicker}>
          {labels[0]}
        </RadioPicker>
      ) : props[0]['type'] === 'mix-picker' ? (
        <MixPicker
          {...props[0]}
          placeholder={props[0]['placeholder'] || `请选择${labels[0]}`}
          value={value[ids[0]]}
          onChange={handlePicker}
        >
          {labels[0]}
        </MixPicker>
      ) : (
        <Picker
          {...props[0]}
          placeholder={props[0]['placeholder'] || `请选择${labels[0]}`}
          value={value[ids[0]]}
          onChange={handlePicker}
        >
          {labels[0]}
        </Picker>
      )}
      {visible ? (
        <TextInput
          {...props[1]}
          placeholder={props[1]['placeholder'] || `请输入${labels[1]}`}
          value={value[ids[1]]}
          onChange={handleText}
        >
          {labels[1]}
        </TextInput>
      ) : null}
    </span>
  );
}

export default forwardRef(PickerInput);
