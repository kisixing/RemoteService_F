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
}

function Tag({ children, style, ...rest }: IProps) {
  return (
    <ANTTag
      style={{
        ...style,
        borderRadius: '50px'
      }}
      {...rest}
    >
      {children}
    </ANTTag>
  );
}

export default Tag;
