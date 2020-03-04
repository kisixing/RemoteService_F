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
  color?: string
}

function Tag({ children, style, small, color, ...rest }: IProps) {
  console.log('9999', color)
  const defaultSize = small ? {} : {
    height: '.4rem',
    lineHeight: '.4rem',
    fontSize: '.24rem',
  };
  const colorStyle = color ? {
    color: '#fff',
    borderColor: color,
    backgroundColor: color,
  } : {};
  return (
    <ANTTag
      small={small}
      style={{
        borderRadius: '50px',
        ...defaultSize,
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
