import React, { forwardRef } from 'react';
import { List, Switch as AntdSwitch } from 'antd-mobile';
import { SwitchProps } from 'antd-mobile/es/switch';

import styles from '../index.less';

interface IProps extends SwitchProps {
  required?: boolean
  children?: React.ReactNode
}

function Switch({ required, value, children, ...rest }: IProps, ref: any) {
  return (
    <List.Item
      extra={
        <AntdSwitch
          ref={ref}
          checked={value}
          {...rest}
        />
      }
    >
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </>
    </List.Item>
  )
}

export default forwardRef(Switch);
