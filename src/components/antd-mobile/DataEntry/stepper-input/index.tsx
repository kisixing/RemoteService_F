import React, { forwardRef } from 'react';
import { List, Stepper } from 'antd-mobile';
import { StepProps } from 'antd-mobile/es/stepper'

import styles from '../index.less';

interface IProps extends StepProps {
  required?: boolean
  children?: React.ReactNode
  error?: any
}

function StepperInput(
  { value, required, children, onChange, error, ...rest }: IProps ,
  ref: any,
) {
  return (
    <List.Item
      className={styles.customList}
      error={error}
      extra={
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Stepper
            ref={ref}
            className={styles.stepperItem}
            showNumber
            value={value}
            onChange={onChange}
            {...rest}
          />
          {!!error ? <div className="list-item-error-extra" /> : null}
        </div>
      }
    >
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </>
    </List.Item>
  );
}

export default forwardRef(StepperInput);
