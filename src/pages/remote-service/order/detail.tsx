/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 我的订单详情
 */

import React from 'react';
import ApplyDetail from './Apply/ApplyDetail';
import ConsultDetail from './Consult/ConsultDetail';
import MonitorDetail from './Monitor/Detail';


function details(props: any) {
  const {
    location: { query },
  } = props;
  const { type, id } = query;

  if (type === 'package') {
    return <MonitorDetail id={id} />;
  }
  if (type === 'apply') {
    return <ApplyDetail id={id} />;
  }
  if (type === 'consult') {
    return <ConsultDetail id={id} />;
  }
  return (
    <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', fontSize: '0.42rem' }}>404</div>
  );
}

export default details;
