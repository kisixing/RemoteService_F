/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-21 22:50:13
 * @Description: 自定义的 CustomIcon 组件替换 antd-mobile Icon
 */
import React from 'react';

const IconFont = (props: any )=> {
  const { type, style, size = '.44rem', className } = props;
  // am-icon
  return <i style={{ fontSize: size, ...style }} className={`iconfont icon-${type} ${className}`} />;
};

export default IconFont;

