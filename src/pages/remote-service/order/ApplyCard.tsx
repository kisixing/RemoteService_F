import React from 'react';
import { IconFont } from '@/components/antd-mobile';
import styles from './ApplyCard.less';

interface ApplyCardProp{
  data: {
    name: string
  }
}

export default function ApplyCard(props:ApplyCardProp) {
  const { data } = props;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <IconFont type="order" size="0.4rem"/>
            <span className={styles.name}>{data.name}</span>
          </div>
          <div className={styles.date}><span>2019-11-11 06:20</span></div>
        </div>
        <div className={styles.detail}>
          <div><span>订单号：56878989</span></div>
          <div><span>结果：NST无反应</span></div>
        </div>
      </div>
      <hr/>
      <div className={styles.price}>
        <IconFont type="order" size="0.4rem"/><span>35</span>
      </div>
    </div>
  )
}
