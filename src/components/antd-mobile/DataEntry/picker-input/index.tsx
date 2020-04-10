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

const initProps = [{ required: false, options: [] }, { required: false }];

function PickerInput({ id, children, value = {}, props = initProps, onChange = () => {} }: IProps, ref: any) {
  // 拆分label，分布赋值给picker和input
  const label = children && children.split('&');
  const ids = id && id.split('&');

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
        <RadioPicker
          required={props[0]['required']}
          options={props[0]['options']}
          value={value[ids[0]]}
          onChange={handlePicker}
        >
          {label[0]}
        </RadioPicker>
      ) : props[0]['type'] === 'mix-picker' ? (
        <MixPicker
          required={props[0]['required']}
          value={value[ids[0]]}
          options={props[0]['options']}
          valueFormat={props[0]['valueFormat']}
          onChange={handlePicker}
          placeholder={props[0]['placeholder'] || `请选择${label[0]}`}
        >
          {label[0]}
        </MixPicker>
      ) : (
        <Picker
          required={props[0]['required']}
          value={value[ids[0]]}
          data={props[0]['options']}
          onChange={handlePicker}
          placeholder={props[0]['placeholder'] || `请选择${label[0]}`}
        >
          {label[0]}
        </Picker>
      )}
      {visible ? (
        <TextInput
          required={props[1]['required']}
          value={value[ids[1]]}
          placeholder={props[1]['placeholder'] || `请输入${label[1]}`}
          onChange={handleText}
          suffix={props[1]['suffix']}
        >
          {label[1]}
        </TextInput>
      ) : null}
    </span>
  );
}

export default forwardRef(PickerInput);
