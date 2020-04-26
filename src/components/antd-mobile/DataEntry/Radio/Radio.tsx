/*
 * @Description: Radio组件
 * @Author: Zhong Jun
 * @Date: 2020-04-13 13:12:31
 */

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './radio.less';

interface IProps {
  children?: React.ReactNode
  disabled?: boolean
  className?: string
  onChange?: (e:any) => void
  checked?: boolean
  value?: any
  style?: object
}

function Radio(props: IProps) {
  const {
    children,
    disabled,
    onChange,
    className = '',
    checked,
    style
  } = props;
  const [che, setChecked] = useState(!!checked);

  useEffect(() => {
    setChecked(!!checked);
  }, [checked]);

  const handleChange = (e: any) => {
    const checked = e.target.checked;
    console.log('onchange', checked);
    if (onChange) {
      onChange(checked);
    }
  };
  return (
    <label className={classnames(styles.radio, className)} style={style}>
      <span className={styles.wrapper}>
        <input
          type="radio"
          checked={che}
          disabled={disabled}
          className={styles.input}
          onChange={handleChange}
        />
        <span className={styles.inner} />
      </span>
      <span className={styles.text}>{children}</span>
    </label>
  );
}

export default Radio;
