import React, { forwardRef } from 'react';
import { InputItem as AntdInputItem } from 'antd-mobile';
import { InputItemProps } from 'antd-mobile/es/input-item';

import styles from '../index.less';

function InputItem({ required, children, clear = true, ...rest }: InputItemProps, ref: any) {
  return (
    <AntdInputItem labelNumber={7} clear={clear} ref={ref} {...rest}>
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </>
    </AntdInputItem>
  );
}

export default forwardRef(InputItem);
