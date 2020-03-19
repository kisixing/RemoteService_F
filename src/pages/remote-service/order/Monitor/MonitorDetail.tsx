import React from 'react';
import { PackageOrderItem } from '../interface';
import { ORDER_STATE_STR } from '../config';
import MonitorCard from './MonitorCard';

import styles from './MonitorDetail.less';

interface MonitorDetailProps{
  data: PackageOrderItem
}

export default function MonitorDetail(props: MonitorDetailProps){
  const { data } = props;
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {data.state ? <span>{ORDER_STATE_STR[data.state]}</span> : <span>暂无订单状态</span>}
      </div>
      <div className={styles.main}>
        <div>
          <MonitorCard data={data}/>
        </div>
      </div>
    </div>
  )
}
