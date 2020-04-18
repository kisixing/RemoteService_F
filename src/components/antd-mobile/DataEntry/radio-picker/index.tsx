import React, { forwardRef } from 'react';
import { List } from 'antd-mobile';
import RadioGroup from './RadioGroup';

import styles from '../index.less';

function RadioPicker({ required, children, error, ...rest }: any, ref: any) {
  return (
    <List.Item
      ref={ref}
      error={error}
      className={styles.customList}
      extra={<RadioGroup error={error} {...rest} />}
    >
      <>
        {required ? <i className={styles.required}>*</i> : null}
        <span className={styles.label}>{children}</span>
      </>
    </List.Item>
  );
}

export default forwardRef(RadioPicker);
