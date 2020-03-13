/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-05 23:31:47
 * @Description: 胎监判图
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { Button, WhiteSpace } from '@/components/antd-mobile';

import { CTGApply, getPackageOrders } from '@/services/remote-service';

function Apply(props: any) {
  const {
    location: { query },
  } = props;
  const { p1, p2, t } = query; // p1 孕册id， p2 监测档案id/判图档案id, t 套餐id

  const [packageOrderId, setPackageOrderId] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    redirection();
  }, []);

  const redirection = () => {
    // 根据孕妇id查询已购服务
    getPackageOrders(p1).then(res => {
      console.log('套餐订单', res);
      if (res && res.length) {
        setIsReady(true);
        const object = res.filter((e: any) => e.device !== null)[0];
        setPackageOrderId(object.id);
        // onClick(Number(p1), Number(p2), object.id);
      }
    });
  };

  const onClick = (p1: number, p2: number, p3?: number) => {
    CTGApply({ pregnancyid: p1, visitid: p2, packageorderid: p3 })
      .then(res => {
        console.log('判图', res);
        // setValid(true);
      })
      .catch(error => console.log('请求异常', error));
  };

  if (isReady) {
    return (
      <div className="page">
        <div style={{ height: '4rem', backgroundColor: '#fcf' }}>
          套餐使用情况
        </div>
        <WhiteSpace />
        <div style={{ height: '1rem', backgroundColor: '#ccf' }}>
          单次胎监判图服务费
        </div>
        <div style={{ margin: '.3rem' }}>
          <Button type="primary" onClick={() => onClick(Number(p1), Number(p2), packageOrderId)}>
            确定
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator toast text="Loading..." animating />
      </div>
      <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(props.location.query)}</div>
    </>
  );
}

export default Apply;
