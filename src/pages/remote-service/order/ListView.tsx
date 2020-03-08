/*
 * @Description: 我的订单列表页 列表内容不是特别多，暂时不考虑长列表数据优化
 * @Author: Zhong Jun
 * @Date: 2020-03-05 11:42:06
 */

import React from 'react';
import Router from 'umi/router';
import { IconFont, Tag, Touchable, Button } from '@/components/antd-mobile';
import styles from './ListView.less';

interface IProps {
  dataSource?: any[]
}


function ListView({ dataSource = [] }: IProps) {
  const onClick = () => {
    Router.push('/orders/detail')
  };

  return (
    <div className={styles.listView}>
      {dataSource.map(e => {
        return (
          <div key={e.key} onClick={onClick} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.title}>
                <IconFont type="order" size="0.4rem" />
                <span className={styles.name}>{e.name}</span>
                <Tag size="middle" bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag>
                <Tag size="middle" bgcolor="#E3D9FC" color="#7540EE">多胎</Tag>
                <span className={styles.extra}>{e.stateText}</span>
              </div>
              <div className={styles.content}>
                <div>订单号：</div>
                <div>设备有效期：</div>
              </div>
            </div>
              <div className={styles.detail}>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default ListView
