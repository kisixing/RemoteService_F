import React from 'react';
import classNames from 'classnames';
import styles from './RadioGroup.less';
import common from '../index.less'

function RadioGroup({ id, options, value, onChange = () => {}, error }: any) {
  const handleChange = (e: any) => {
    let flag = e.target.value;
    const checked = options.filter((e: any) => e.value.toString() === flag)[0];
    onChange(checked.value);
  };
  return (
    <div className={styles.group}>
      {options.map((item: { label: string; value: any }, index: any) => {
        return (
          <label key={index} className={styles.item}>
            <input
              className={classNames(styles.radio, {
                [styles.dot]: true,
                [styles.tick]: false,
              })}
              type="radio"
              value={item.value}
              checked={item.value === value}
              onChange={handleChange}
            />
            <span className={styles.label}>
              {item.label}
            </span>
          </label>
        );
      })}
      {!!error ? <div className="list-item-error-extra" /> : null}
    </div>
  );
}

export default RadioGroup;
