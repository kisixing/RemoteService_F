import React from 'react';
import Touchable from 'rmc-feedback';
import { ITouchProps } from 'rmc-feedback/lib/PropTypes';

interface IProps extends ITouchProps {
  children: React.ReactNode
}

export default function({
  disabled = false,
  activeClassName = "",
  activeStyle = {},
  children
}: IProps) {
  return (
    <Touchable
      activeClassName={activeClassName}
      activeStyle={{ background: '#eee' }}
    >
      {children}
    </Touchable>
  )
}
