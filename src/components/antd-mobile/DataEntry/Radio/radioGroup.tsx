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

function RadioGroup({ children, defaultValue, value, onChange, disabled, size }: IProps) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    setCurrentValue(value === undefined ? defaultValue : value);
  }, [value]);

  const handleChange = (value: any) => {
    if (onChange) {
      onChange(value)
    }
    setCurrentValue(value);
  }

  return (
    <div className={styles.group}>
      {Children.map(children, (element: any) => {
        if (!element) {
          return null;
        }

        return cloneElement(
          element,
          Object.assign({}, element.props, {
            onChange: handleChange,
            model: currentValue,
            size: size,
          }),
        );
      })}
    </div>
  );
}

export default RadioGroup;
