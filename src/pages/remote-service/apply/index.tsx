/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-05 23:31:47
 * @Description: 胎监判图
 */

import React, { useState, useEffect } from 'react';
import { Redirect } from 'umi';
import { ActivityIndicator } from 'antd-mobile';

import { CTGApply, getPackageOrders } from '@/services/remote-service';

function Apply(props: any) {
  const [valid, setValid] = useState()

  useEffect(() => {
    judge();
    getRequest();
  }, [])

  const judge = () => {
    const {
      location: { query },
    } = props;
    const { p1, p2, t } = query; // p1 孕册id， p2 监测档案id/判图档案id, t 套餐id
    CTGApply({ pregnancyid: p1, visitid: p2, packageorderid: t })
      .then(res => {
        console.log('判图', res);
        // setValid(true);
      })
      .catch(error => console.log('请求异常', error));
  };

  const getRequest = () => {

  }

  if (valid === false) {
    return <Redirect to="/apply/unuseable" />;
  }
  if (valid) {
    return <Redirect to="/apply/useable" />;
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ActivityIndicator toast text="Loading..." animating />
    </div>
  );
}

export default Apply;
