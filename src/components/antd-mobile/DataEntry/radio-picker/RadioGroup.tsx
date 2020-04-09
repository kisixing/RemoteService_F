import React from 'react';
import classNames from 'classnames';
import styles from './RadioGroup.less';

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
          <div key={`${id}-${item.value.toString()}`} className={styles.item}>
            <input
              id={`${id}-${item.value.toString()}`}
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
