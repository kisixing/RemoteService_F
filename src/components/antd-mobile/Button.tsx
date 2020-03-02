import React from 'react';
import { Button } from 'antd-mobile';
import { ButtonProps } from 'antd-mobile/es/button';

interface IProps extends ButtonProps {
  circular?: boolean
  shadow?: boolean
  children?: React.ReactNode
}

export default function (props: IProps) {
  const {
    children,
    circular = true,
    shadow = false,
    style = {},
    ...rest
  } = props;
  const circularStyle = circular ? { borderRadius: '100px' } : {};
  const shadowStyle =
    shadow ? {
      backgroundImage: 'linear-gradient(165deg, #FFBE2D, #FFE672)',
      boxShadow: '0PX 3PX 1PX -2PX rgba(0,0,0,0.2), 0PX 2PX 2PX 0PX rgba(0,0,0,0.14), 0PX 1PX 5PX 0PX rgba(0,0,0,0.12)',
      borderWidth: 'none'
    } : {};
  return <Button style={{ ...circularStyle, ...shadowStyle, ...style }} { ...rest }>{children}</Button>;
}
