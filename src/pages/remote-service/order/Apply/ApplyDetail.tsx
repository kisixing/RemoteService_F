import React from 'react';
import { IconFont } from '@/components/antd-mobile';
import { ServiceOrderItem } from '@/pages/remote-service/order/interface';


import styles from './ApplyDetail.less';

interface ApplyDetailProps{
  data: ServiceOrderItem
}

export default function ApplyDetail(props: ApplyDetailProps){
  const { data } = props;
  const { prenatalvisit } = data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <IconFont type="fetus"/><span>胎监判图</span>
          </div>
          <div>
            <span>未诊断</span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span>订单号:{data.sn}</span>
          </div>
          <div>
            <span>问诊日期:{prenatalvisit?.visitDate}</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div><span>主治医师:{prenatalvisit?.doctor}</span></div>
        <div><span>诊断结果:{prenatalvisit?.diagnosis}</span></div>
      </div>
    </div>
  )
}
