/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-14 11:16:47
 * @Description: 行政区域图
 * 详细到村委的数据太大，考虑其他开源cnd资源 高德地图https://lbs.amap.com/api/webservice/guide/api/district
 */


import React, { forwardRef, useState, useEffect } from 'react';
import { List, Toast } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import Picker from '../picker';
import options from './cascader-address-options';
import styles from './index.less';

const axios = require('axios');

// 高德行政区分
const district_api = 'https://restapi.amap.com/v3/config/district';
const key = '7f9145369205a80f3cc72bd16bda0188';

interface IProps extends PickerPropsType {
  required?: boolean
  children?: React.ReactNode
  placeholder?: string
  onChange?: any
  value?: any
  valueFormat?: 'string' | 'array'
}

function AddressPicker({ required, children, placeholder, onChange, valueFormat = 'array', value, ...rest }: IProps, ref: any) {
  const [ssq, setSSQ] = useState([])
  const [zc, setZC] = useState([]);
  const [streetOptions, setStreetOptions] = useState([]);

  useEffect(() => {
    // value格式转化
    // 判断value字符类型，默认array同antd-mobile
    let correctValue = [];
    if (value && Object.prototype.toString.call(value) === '[object String]') {
      correctValue = value.split(',');
    }
    if (value && Object.prototype.toString.call(value) === '[object Array]') {
      correctValue = value;
    }
    const ssq = correctValue.slice(0, 3);
    const zc = correctValue.slice(3);
    if (correctValue[2]) {
      getDistrict(correctValue[2])
    }
    setSSQ(ssq);
    setZC(zc);
  }, [value])

  const handleSSQ = (val: any) => {
    setSSQ(val);
    let address: any = [...val, ...zc];
    if (valueFormat === 'string') {
      address = address.join(',')
    }
    onChange(address);
    // 获取该地区的街道信息、村委信息
    getDistrict(val[2]);
  }

  const handleZC = (val: any) => {
    setZC(val);
    let address: any = [...ssq, ...val];
    if (valueFormat === 'string') {
      address = address.join(',')
    }
    onChange(address);
  };

  const getDistrict = (area: string) => {
    axios
      .get(district_api, {
        params: {
          key,
          keywords: area,
          subdistrict: 1,
          page: 1,
        },
      })
      .then(function(response: any) {
        const data = response.data;
        if (data.status === '1') {
          const districts = data.districts[0]['districts'];
          const streets = districts.map((e: any) => ({ label: e.name, value: e.name }));
          setStreetOptions(streets);
        } else {
          Toast.info(response.info);
        }
      })
      .catch(function(error: any ) {
        console.log(error);
      });
  };

  return (
    <List.Item
      ref={ref}
      className={styles.list}
      extra={
        <div className={styles.extraContent}>
          <div className={styles.item}>
            <Picker cols={3} data={options} value={ssq} onChange={handleSSQ} placeholder="请选择省市区" title="省市区" />
          </div>
          <div className={styles.item}>
            <Picker data={streetOptions} cols={1} value={zc} onChange={handleZC} placeholder="请选择街道/村委" title="街道/村委" />
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
