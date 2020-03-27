import React from 'react';
import moment from 'moment';
import { Tag, IconFont, Button } from '@/components/antd-mobile';
import styles from '../Monitor/Card.less';

function Card({ data, onClick }: any) {
  return (
    <li key={data.id} className={styles.item} onClick={() => onClick(data)}>
      <div className={styles.header} style={{ marginBottom: 0, borderBottom: '1PX solid #f1f1f5' }}>
        <div className={styles.title}>
          <IconFont type="order" size="0.36rem" />
          <span className={styles.name}>{'图文咨询'}</span>
          <span className={styles.right}>
            {/* 咨询状态 */}
            <Tag size="middle" bgcolor="#ebedf0" color="#383f4a">
              {'待支付'}
            </Tag>
          </span>
        </div>
        <div className={styles.div}>
          订单号：<span className={styles.time}>{data.sn}</span>
        </div>
        <div className={styles.div}>
          时&emsp;间：
          <span className={styles.time}>{moment().format('YYYY-MM-DD HH:mm')}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ display: 'flex', alignItems: 'center', lineHeight: 'initial', paddingRight: '0.15rem' }}>
          <IconFont type="refund" size="0.36rem" />
          <span style={{ fontSize: '0.32rem', color: '#150f55' }}>
            {data.payment === 'package' ? '套餐扣除' : data.payment}
          </span>
          <span style={{ flex: '1', textAlign: 'right' }}>
            <Button inline size="small">
              评价
            </Button>
            <Button inline size="small">
              再次咨询
            </Button>
            <Button inline type="primary" size="small">
              支付
            </Button>
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
