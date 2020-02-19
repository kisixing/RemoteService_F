import React from 'react';
import { WhiteSpace } from 'antd-mobile';

interface IProps {
  color?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function (props: IProps) {
  const { color = "#f8f8f8", ...rest } = props;
  return <WhiteSpace style={{ backgroundColor: color }} {...rest} />
}

