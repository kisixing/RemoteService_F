import React from 'react';
import moment from 'moment';
import { Tag, IconFont } from '@/components/antd-mobile';
import styles from './Card.less';

function Card({ data = {}, hideOverPrint = false, onClick = () => {} }: any) {
  return (
    <li key={data.id} className={styles.item} onClick={() => onClick(data.id)}>
      <div className={styles.header}>
        <div className={styles.title}>
          <IconFont type="order" size="0.36rem" />
          <span className={styles.name}>{data.servicepackage && data.servicepackage.name || data.name}</span>
          <Tag size="middle" bgcolor="#d9f0f8" color="#3fb6dc">
            {'单胎'}
          </Tag>
        </div>
        <div className={styles.div}>
          订单号：<span className={styles.time}>{data.sn}</span>
        </div>
        <div className={styles.div}>
          有效期：
          <span className={styles.time}>
            {moment(data.createtime).format('YYYY-MM-DD')} ~ {moment(data.validdate).format('YYYY-MM-DD')}
          </span>
        </div>
        {/* 从0开始对应 新订单、已支付、使用中、完成、关闭、逾期、取消 */}
        <div
          className={styles.overprint}
          style={{
            display: `${hideOverPrint ? 'none' : 'inline-block'}`,
            backgroundImage: `url(/images/icon/overprint_${!!data.state ? data.state : 1}@3x.png)`,
          }}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.content}>
        <div>
          <IconFont type="fetus" size="0.36rem" />
          <span>胎监判图服务</span>
          <span className={styles.right}>{data.service1amount + data.service2amount} 次</span>
        </div>
        <div>
          <IconFont type="device" size="0.36rem" />
          <span>{data.device && data.device.devicename}</span>
          <span className={styles.right}>租用 -- 个</span>
        </div>
        <div>
          <IconFont type="refund" size="0.36rem" />
          <span style={{ fontSize: '0.32rem', color: '#150f55' }}>{data.price}</span>
          <span style={{ marginLeft: '.32rem', fontSize: '0.2rem', color: '#5c6187' }}>
            (含押金￥ {data.cashPledge || '---'})
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card
