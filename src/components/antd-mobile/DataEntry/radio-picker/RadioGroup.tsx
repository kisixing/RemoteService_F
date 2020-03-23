import React from 'react';
import styles from './RadioGroup.less';

function RadioGroup({ id, data, value, onChange, charactertype, error }: any) {
  const handleChange = (e: any) => {
    const value = e.target.value;
    if (charactertype === 'boolean') {
      const flag = value === 'false' ? false : true;
      return onChange(flag);
    }
    onChange(value);
  };

  return (
    <div className={styles.group}>
      {data.map((item: { label: string; value: any }, index: any) => {
        return (
          <span key={item.value || index} className={styles.item}>
            <input
              id={`${id}-${index}`}
              className={styles.radio}
              type="radio"
              value={item.value}
              checked={item.value === value}
              onChange={handleChange}
            />
            <label htmlFor={item.value.toString()} className={styles.label}>
              {item.label}
            </label>
          </span>
        );
      })}
      {error ? <div className="am-input-error-extra" /> : null}
    </div>
  );
}

export default RadioGroup;
