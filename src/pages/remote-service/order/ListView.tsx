/*
 * @Description: 我的订单列表页 列表内容不是特别多，暂时不考虑长列表数据优化
 * @Author: Zhong Jun
 * @Date: 2020-03-05 11:42:06
 */

import React from 'react';
import Router from 'umi/router';
import { IconFont, Tag, Touchable } from '@/components/antd-mobile';

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
          <div key={e} onClick={onClick} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.title}>
                <IconFont type="order" size="44px" />
                <span className={styles.name}>{e}</span>
                <Tag>单胎</Tag>
                <Tag>多胎</Tag>
                <span>已支付</span>
              </div>
            </div>
            <div className={styles.detail}></div>
          </div>
        );
      })}
    </div>
  )
}

export default ListView
