import React, { Children, cloneElement, useState, useEffect } from 'react';
import styles from './radio.less';

interface IProps {
  children?: React.ReactNode
  defaultValue?: any[]
  value?: any[]
  onChange?: (value?: any, event?: any) => void
  disabled?: boolean
  size?: string
}

function RadioGroup({ children, defaultValue, value, onChange = () => {}, disabled, size }: IProps) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    setCurrentValue(value === undefined ? defaultValue : value);
  }, [value]);

  return (
    <div className={styles.group}>
      {Children.map(children, (element: any) => {
        if (!element) {
          return null;
        }

        return cloneElement(element, {
          size,
          disabled,
          checked: element.props.value === currentValue,
          onChange:(val: any, e: any) => {
            setCurrentValue(val);
            onChange(val, e);
          },
        });
      })}
    </div>
  );
}

export default RadioGroup;
