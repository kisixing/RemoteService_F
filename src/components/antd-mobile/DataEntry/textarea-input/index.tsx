import React, { forwardRef } from 'react';
import { TextareaItem as AntdTextareaItem, Toast } from 'antd-mobile';
import { TextareaItemProps } from 'antd-mobile/es/textarea-item';

import styles from '../index.less';

function TextareaItem({
  id,
  required,
  children,
  autoHeight = true,
  clear = true,
  error,
  ...rest
}: TextareaItemProps, ref: any) {
  const errorText = (error: any) => {
    if (error) {
      const text = error.join(',');
      return Toast.info(text)
    }
    return null;
  };
  return (
    <AntdTextareaItem
      ref={ref}
      title={
        <>
          {required ? <i className={styles.required}>*</i> : null}
          <span className={styles.label}>{children}</span>
        </>
      }
      className="custom-input-item"
      data-seed={id}
      autoHeight={autoHeight}
      clear={clear}
      labelNumber={7}
      error={error}
      onErrorClick={() => errorText(error)}
      {...rest}
    />
  );
}

export default forwardRef(TextareaItem);
