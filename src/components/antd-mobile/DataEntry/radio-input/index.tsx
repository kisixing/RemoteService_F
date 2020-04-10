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
  id: string
  children: string
  value?: object
  onChange?: (values: any) => void
  props?: any[]
}

const initProps = [{ required: false }, { required: false }];

function RadioInput(
  { id, children, value = {}, onChange = () => {}, props = initProps }: IProps,
  ref: any,
) {
  const label = children && children.split('&');
  const ids = id && id.split('&');

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
        required={props[0]['required']}
        options={props[0]['options']}
        value={value[ids[0]]}
        onChange={handleRadio}
      >
        {label[0]}
      </RadioPicker>
      {visible ? (
        <TextInput
          required={props[1]['required']}
          placeholder={`请输入${label[1]}`}
          suffix={props[1]['suffix']}
          value={value[ids[1]]}
          onChange={handleText}
        >
          {label[1]}
        </TextInput>
      ) : null}
    </span>
  );
}

export default forwardRef(RadioInput);
