/*
 * @Description: Radio组件
 * @Author: Zhong Jun
 * @Date: 2020-04-13 13:12:31
 */

import React from 'react';

import styles from './Radio.less';

interface IProps {
  children?: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  onChange?: (e:any) => void
  onClick?: () => void
  checked?: boolean
  value?: any
}

function Radio(props: IProps) {
  const { id, children, required, disabled, className, checked, onChange, onClick, value } = props;
  const handleChange = (e: any) => {
    if (disabled) {
      return;
    }
    if (onChange) {
      onChange({
        target: {
          ...props,
          checked: e.target.checked,
        },
        stopPropagation() {
          e.stopPropagation();
        },
        preventDefault() {
          e.preventDefault();
        },
        nativeEvent: e.nativeEvent,
      });
    }
  };
  return (
    <label className={styles.radio}>
      <input
        id={id}
        name={name}
        type="radio"
        required={required}
        disabled={disabled}
        className={className}
        checked={!!checked}
        onClick={onClick}
        onChange={handleChange}
        value={value}
      />
      <span className={styles['radio-label']}>{children}</span>
    </label>
  );
}

export default Radio;
