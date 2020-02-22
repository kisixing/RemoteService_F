import React from 'react';
import { Picker as ANTDPicker } from 'antd-mobile';
import InputItem from './InputItem';
import styles from './InputItem.less';

interface Iprops {
  cols?: number;
  extra?: string;
  title?: string
  onChange?: (value: string[]) => void;
  onPickerChange?: () => void;
  options?: any[]
  icon?: string | React.ReactNode
  readOnly?: boolean
  placeholder?: string
  value?: string
}

export default function Picker(props: Iprops) {
  const {
    title,
    cols = 3,
    extra,
    options = [],
    readOnly = true,
    icon,
    value,
    onChange = () => {}
  } = props;

  const onSelect = (val: any) => {
    const strVal = val.join(',');
    onChange(strVal);
  }
  return (
    <ANTDPicker
      cols={cols}
      extra={extra}
      data={options}
      title={title}
      value={value && value.split(',')}
      onChange={onSelect}
    >
      <CustomChildren icon={icon} readOnly={readOnly} value={value} />
    </ANTDPicker>
  )
}

const CustomChildren = (props: any )=> {
  return (
    <InputItem
      onClick={props.onClick}
      icon={props.icon}
      readOnly={props.readOnly}
      placeholder={props.extra}
      value={props.value}
    />
  );
}
