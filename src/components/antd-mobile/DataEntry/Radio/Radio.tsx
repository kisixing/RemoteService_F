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
  model?: any
  style?: object
}

function Radio(props: IProps) {

  const getChecked = (props: IProps) => {
    return props.model == props.value || Boolean(props.checked);
  };

  const [checked, setChecked] = useState(getChecked(props));

  useEffect(() => {
    setChecked(getChecked(props));
  }, [props.checked]);

  const handleChange = (e: any) => {
    const checked = e.target.checked;
    if (props.onChange) {
      props.onChange(checked);
    }
    setChecked(checked);
  };
  return (
    <label className={styles.radio} style={props.style}>
      <span
        className={classnames({
          [styles.radio__input]: true,
          'is-checked': checked,
          'is-disabled': props.disabled,
          'is-focus': focus,
        })}
      >
        <input
          type="radio"
          checked={checked}
          disabled={props.disabled}
          className={styles.radio__original}
          onChange={handleChange}
        />
        <span className={styles.radio__inner} />
      </span>
      <span className={styles.radio__label}>{props.children}</span>
    </label>
  );
}

export default Radio;
