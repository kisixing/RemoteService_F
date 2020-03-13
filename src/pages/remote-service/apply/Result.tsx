/*
 * @Description: 判图服务扣除成功
 * @Author: Zhong Jun
 * @Date: 2020-03-12 15:05:48
 */

import React from 'react';
import { Button, WhiteSpace, Tag, IconFont } from '@/components/antd-mobile';
import { router } from '@/utils/utils';

function Result() {
  const onClick = () => {
    router('/orders')
  }
  return (
    <div className="page">
      <div
        style={{
          height: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        判图服务扣除成功
      </div>
      <div style={{ padding: '0.3rem' }}>
        <Button type="primary" onClick={onClick}>我的订单</Button>
      </div>
    </div>
  );
}

export default Result;
