import React, { forwardRef } from 'react';
import { List, Stepper } from 'antd-mobile';
import { StepProps } from 'antd-mobile/es/stepper'

import styles from '../index.less';

interface IProps extends StepProps {
  required?: boolean
  children?: React.ReactNode
}

function StepperInput(
  { value, required, children, onChange, ...rest }: IProps ,
  ref: any,
) {
  return (
    <List.Item
      wrap
      extra={
        <Stepper
          ref={ref}
          className={styles.stepperItem}
          showNumber
          value={value}
          onChange={onChange}
          {...rest}
        />
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
