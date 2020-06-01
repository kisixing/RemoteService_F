/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 我的订单详情
 */

import React from 'react';
import { connect } from 'dva';
import ApplyDetail from './Apply/Detail';
import ConsultDetail from './Consult/ConsultDetail';
import MonitorDetail from './Monitor/Detail';
// app跳转页面
import ListView from './Apply/ListView';

function details(props: any) {
  const {
    location: { query },
  } = props;
  const { type, id, p1, p2, t } = query;

  if (t === 'HR' || t === 'SHR') {
    // 判图历史记录，全部
    return <ListView p1={p1} p2={p2} />;
  }
  if (t === 'SR') {
    // 判图历史记录，即详情
    return <ApplyDetail id={p2} />;
  }
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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.42rem',
      }}
    >
      <span>404</span>
    </div>
  );
}

export default connect()(details);
