import React, { forwardRef } from 'react';
import { InputItem as AntdInputItem, Toast } from 'antd-mobile';
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
  onChange = () => {},
  ...rest
}: IProps, ref: any) {
  // handleChange方法主要是限制输入字符长度
  const handleChange = (value: any) => {
    if (rest.maxLength && value.length > rest.maxLength ) {
      return;
    }
    // 删除前后空格
    onChange(value.trim());
  }
  const errorText = (error: any) => {
    if (error) {
      const text = error.join(',');
      return Toast.info(text)
    }
    return null;
  };
  return (
    <AntdInputItem
      ref={ref}
      className="custom-input-item"
      labelNumber={7}
      clear={clear}
      error={error}
      onChange={handleChange}
      onErrorClick={() => errorText(error)}
      {...rest}
    >
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
        <span className={styles.suffix}>{suffix}</span>
      </>
    </AntdInputItem>
  );
}

export default forwardRef(InputItem);
