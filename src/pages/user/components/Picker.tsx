import React from 'react';
import { Picker as ANTDPicker } from 'antd-mobile';
import InputItem from './InputItem';

interface IProps {
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

interface IState {}

export default class Picker extends React.Component<IProps, IState> {
  onSelect = (val: any) => {
    console.log('88888888', val)
    const { onChange = () => {} } = this.props;
    const strVal = val.join(',');
    onChange(strVal);
  }

  render () {
    const {
      title,
      cols = 3,
      extra,
      options = [],
      readOnly = true,
      icon,
      value,
    } = this.props;
    const label = options.filter(e => e.value == value)[0]['label']
    return (
      <ANTDPicker
        cols={cols}
        extra={extra}
        data={options}
        title={title}
        value={value && value.split(',')}
        onChange={this.onSelect}
      >
        <CustomChildren icon={icon} readOnly={readOnly} value={label} />
      </ANTDPicker>
    );
  }
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
