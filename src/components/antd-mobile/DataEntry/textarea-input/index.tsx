import React, { forwardRef } from 'react';
import { TextareaItem as AntdTextareaItem } from 'antd-mobile';
import { TextareaItemProps } from 'antd-mobile/es/textarea-item';

import styles from '../index.less';

function TextareaItem({ id, required, children, autoHeight = true, clear = true, ...rest }: TextareaItemProps, ref: any) {
  return (
    <AntdTextareaItem
      title={
        <>
          {required ? <i className={styles.required}>*</i> : null}
          <span className={styles.label}>{children}</span>
        </>
      }
      data-seed={id}
      autoHeight={autoHeight}
      clear={clear}
      labelNumber={7}
      ref={ref}
      {...rest}
    />
  );
}

export default forwardRef(TextareaItem);
