/*
 * @Description: tag标签
 * @Author: Zhong Jun
 * @Date: 2020-03-04 17:46:44
 */

import React from 'react';
import { Tag as ANTTag } from 'antd-mobile';
import { TagProps } from 'antd-mobile/es/tag';

interface IProps extends TagProps {
  children: React.ReactNode
  bgcolor?: string
  color?: string
  size?: string
}

function Tag({ children, style, size, bgcolor, color, ...rest }: IProps) {
  let sizeStyle: object = { fontSize: '0.24rem' };
  if (size === 'small') {
    sizeStyle = { lineHeight: '0.28rem' };
  }
  if (size === 'middle') {
    sizeStyle = { height: '.4rem', lineHeight: '0.38rem', padding: '0 .24rem', fontSize: '.2rem' };
  }
  let colorStyle: object = {};
  if (!!bgcolor) {
    colorStyle = { color: '#fff' }
  }
  if (!!color) {
    colorStyle = { color }
  }
  const bgcolorStyle = bgcolor ? {
    borderColor: bgcolor,
    backgroundColor: bgcolor,
  } : {};

  return (
    <ANTTag
      small={size === 'small' ? true : false}
      style={{
        borderRadius: '50px',
        letterSpacing: '2px',
        ...sizeStyle,
        ...bgcolorStyle,
        ...colorStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </ANTTag>
  );
}

export default Tag;
