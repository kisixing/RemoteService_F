import React from 'react';
import classNames from 'classnames';
import styles from './RadioGroup.less';

function RadioGroup({ id, data, value, onChange, error }: any) {
  const handleChange = (e: any) => {
    let flag = e.target.value;
    const checked = data.filter((e: any) => e.value.toString() === flag)[0];
    onChange(checked.value);
  };

  return (
    <div className={styles.group}>
      {data.map((item: { label: string; value: any }, index: any) => {
        return (
          <div key={item.value} className={styles.item}>
            <input
              id={item.value.toString()}
              className={classNames(styles.radio, {
                [styles.dot]: true,
                [styles.tick]: false,
              })}
              type="radio"
              value={item.value}
              checked={item.value === value}
              onChange={handleChange}
            />
            <label htmlFor={item.value.toString()} className={styles.label}>
              {item.label}
            </label>
          </div>
        );
      })}
      {error ? <div className="am-input-error-extra" /> : null}
    </div>
  );
}

export default RadioGroup;
