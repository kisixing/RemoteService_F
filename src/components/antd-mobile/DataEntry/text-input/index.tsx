import React, { forwardRef } from 'react';
import { InputItem as AntdInputItem } from 'antd-mobile';
import { InputItemProps } from 'antd-mobile/es/input-item';

import styles from '../index.less';

interface IProps extends InputItemProps {
  suffix?: string
}

function InputItem({
  required,
  children,
  clear = true,
  suffix,
  error,
  ...rest
}: IProps, ref: any) {
  return (
    <AntdInputItem ref={ref} className="custom-input-item" labelNumber={7} clear={clear} error={error} {...rest}>
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
        <span className={styles.suffix}>{suffix}</span>
      </>
    </AntdInputItem>
  );
}

export default forwardRef(InputItem);
