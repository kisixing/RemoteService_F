/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 11:16:47
 * @Description: 行政区域图
 * 详细到村委的数据太大，考虑其他开源cnd资源 高德地图https://lbs.amap.com/api/webservice/guide/api/district
 */


import React, { forwardRef, useState } from 'react';
import { List } from 'antd-mobile';
import Picker from '../picker';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import options from './cascader-address-options';

import styles from './index.less';

interface IProps extends PickerPropsType {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
}

function AddressPicker({ required, children, placeholder, onChange, ...rest }: IProps, ref: any) {
  const [ssq, setSSQ] = useState([])
  const [zc, setZC] = useState([]);

  const handleSSQ = (val: any) => {
    setSSQ(val);
    onChange([val, zc]);
    // 获取该地区的街道信息、村委信息
  }

  const handleZC = (val: any) => {
    setZC(val);
    onChange([ssq, val]);
  };

  return (
    <List.Item
      ref={ref}
      className={styles.list}
      extra={
        <div className={styles.extraContent}>
          <div className={styles.item}>
            <Picker cols={3} data={options} value={ssq} onChange={handleSSQ} title="省市区" />
          </div>
          <div className={styles.item}>
            <Picker data={[]} value={zc} onChange={handleZC} title="街道/村委" />
          </div>
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

export default forwardRef(AddressPicker);
