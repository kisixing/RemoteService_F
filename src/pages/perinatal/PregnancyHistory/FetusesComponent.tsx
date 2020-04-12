/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-05 00:22:14
 * @Description: 胎儿信息组件
 */

import React, { forwardRef } from 'react'
import { List } from 'antd-mobile';
import FetusForm from './FetusForm';

import styles from './FetusesComponent.less';

// 读取配置文件
const { history } = window.configuration;
const dataSource = history.data[0]['children'].filter((e: any) => e.id === 'fetus')[0]['data'];

interface P {
  required?: boolean
  data: any[]
  number?: number | undefined
  value?: object
  children?: React.ReactNode
  onChange?: () => void
}

function FetusesComponent({ children, required, value = [], number = 0, onChange = () => {}}: P, ref: any) {
  console.log('object-value', value);

  const handleChange = (val: any, index: number) => {
    let newValue = value;
    newValue[index] = val;
    onChange(newValue)
  }

  const loop = (number: number) => {
    let node: React.ReactNode[] = [];
    for (let i = 0; i < number; i++) {
      const element = (
        <div key={i + 1} className={styles.formWrap}>
          <p>{`胎儿${i + 1}`}</p>
          <FetusForm dataSource={dataSource} value={value[i]} onChange={(e: any) => handleChange(e, i)} />
        </div>
      );
      node.push(element);
    }
    return node;
  };

  return (
    <div ref={ref}>
      <List.Item>
        <>
          {required ? <i className={styles.required}>*</i> : null}
          <span className={styles.label}>{children}</span>
        </>
      </List.Item>
      {loop(number)}
    </div>
  )
}

export default forwardRef(FetusesComponent);
