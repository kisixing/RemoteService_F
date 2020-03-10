import React from 'react';
import {IconFont, Button} from '@/components/antd-mobile';

import styles from './ConsultCard.less';

interface ConsultCardProps {
  data: {
    name: string
  }
}

export default function ConsultCard(props: ConsultCardProps) {
  const {data} = props;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div><IconFont type='order' size="0.4rem" /><span className={styles.name}>{data.name}</span> </div>
          <div><span>咨询结束</span></div>
        </div>
        <div className={styles.info}>
          <div className={styles.order}>
            <span>订单号：18798898</span>
            &nbsp;&nbsp;
            <span className={styles.date}>2020-02-09 06:20</span>
          </div>
          <div className={styles.doctor}>
            <div className={styles.image}>
              <img src={require('@/assets/order/doctor.png')} alt=""/>
            </div>
            <div className={styles.text}>
              <div>黄弈声</div>
              <div>医生</div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className={styles.footer}>
        <div className={styles.price}><IconFont type="fetus"/><span>20</span></div>
        <div className={styles.handler}>
          <Button className={styles.btn}>评价</Button>
          <Button className={styles.btn}>再次咨询</Button>
        </div>
      </div>
    </div>
  )
}
