import React from 'react';
import styles from './RadioGroup.less';

function RadioGroup({ data, value, onChange, error }: any) {
  const handleChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className={styles.group}>
      {data.map((item: { label: string; value: any }, index: any) => {
        return (
          <span key={item.value || index} className={styles.item}>
            <input
              id={item.value || index}
              name={item.label}
              className={styles.radio}
              type="radio"
              value={item.value}
              checked={item.value === value}
              onChange={handleChange}
            />
            <label htmlFor={item.value} className={styles.label}>
              {item.label}
            </label>
          </span>
        );
      })}
      {error ? <div className="am-input-error-extra" /> : null}
    </div>
  );
}

export default RadioGroup
