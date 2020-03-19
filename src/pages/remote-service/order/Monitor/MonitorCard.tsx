import React from 'react';
import { IconFont, Tag  } from '@/components/antd-mobile';
import { ProductItem } from '@/pages/remote-service/package/interface';
import { PackageOrderItem } from '../interface';
import { ORDER_STATE_STR } from '../config';
import styles from './MonitorCard.less';

interface MonitorCardProp {
  data: PackageOrderItem
}

export default function MonitorCard(props: MonitorCardProp) {
  const { data } = props;
  const { servicepackage, products = [] } = data;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <IconFont type="order" size="0.4rem" />
            <span className={styles.name}>{servicepackage.name}</span>
          </div>
          <Tag size="middle" bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag>
          {/* <Tag size="middle" bgcolor="#E3D9FC" color="#7540EE">多胎</Tag> */}
          <span className={styles.extra}>
            {/* {e.stateText}   */}
            {/* <img src={require('@/assets/order/statepic.png')} alt=""/> */}
            {data.state ? `${ORDER_STATE_STR[data.state]}` : '无状态'}
          </span>
        </div>
        <div className={styles.info}>
          <div><span>订单号：{data.sn}</span></div>
          <div><span>设备有效期：{data.validdate}天</span></div>
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.content}>
          {products.map((v:ProductItem) => (
            <div key={v.id}>
              <div><IconFont type="fetus"/><span>{v.name}</span></div>
              <div><span>租用</span></div>
            </div>
          ))}
          <div>
            <div><IconFont type="fetus"/><span>剩余可用次数</span></div>
            <div><span>{data.service1amount}次</span></div>
          </div>
          {/* <div>
            <div><IconFont type="fetus"/><span>咨询次数</span></div>
            <div><span>{data.service2amount}次</span></div>
          </div> */}
        </div>
        <hr/>
        <div className={styles.price}>
          <div><IconFont type="device"/><span>{data.price}</span><span>（含押金2500）</span></div>
        </div>
      </div>
    </div>
  )
}
