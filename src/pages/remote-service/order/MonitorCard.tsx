import React from 'react';
import { IconFont, Tag  } from '@/components/antd-mobile';

import styles from './MonitorCard.less';

interface MonitorCardProp {
  data?: {
    name: string
  }
}

export default function MonitorCard(props: MonitorCardProp) {
  const { data = {name: '一个月胎监服务套餐'} } = props;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <IconFont type="order" size="0.4rem" />
            <span className={styles.name}>{data.name}</span>
          </div>
          <Tag size="middle" bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag>
          {/* <Tag size="middle" bgcolor="#E3D9FC" color="#7540EE">多胎</Tag> */}
          <span className={styles.extra}>
            {/* {e.stateText}   */}
            <img src={require('@/assets/order/statepic.png')} alt=""/>
          </span>
        </div>
        <div className={styles.info}>
          <div>订单号：78798898</div>
          <div>设备有效期：2019/12/12~2020/01/11</div>
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.content}>
          <div>
            <div><IconFont type="fetus"/><span>胎监判图服务</span></div>
            <div><span>租用 6次</span></div>
          </div>
          <div>
            <div><IconFont type="device"/><span>民用版单胎胎心监护设备</span></div>
            <div><span>租用 1个</span></div>
          </div>
        </div>
        <hr/>
        <div className={styles.price}>
          <div><IconFont type="device"/><span>5000</span><span>（含押金2500）</span></div>
        </div>
      </div>
    </div>
  )
}
