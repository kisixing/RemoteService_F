import React from 'react';
import { IconFont } from '@/components/antd-mobile';
import styles from './ApplyCard.less';
import { ServiceOrderItem } from './interface';
interface ApplyCardProp{
  data: ServiceOrderItem
}

export default function ApplyCard(props:ApplyCardProp) {
  const { data } = props;
  const { prenatalvisit } = data;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <IconFont type="order" size="0.4rem"/>
            <span className={styles.name}>胎监判图</span>
          </div>
          <div className={styles.date}><span>{prenatalvisit?.visitDate}</span></div>
        </div>
        <div className={styles.detail}>
          <div><span>订单号：{data.sn}</span></div>
          <div><span>结果：{prenatalvisit?.diagnosis}</span></div>
        </div>
      </div>
      <hr/>
      <div className={styles.price}>
        <IconFont type="order" size="0.4rem"/><span>35</span>
      </div>
    </div>
  )
}
