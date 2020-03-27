/*
 * @Description: 套餐订单列表
 * @Author: Zhong Jun
 * @Date: 2020-03-26 15:26:17
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { ActivityIndicator } from 'antd-mobile';
import { getPackageOrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';
import Card from './Card';

import styles from './ListView.less';

// 订单状态
// public static enum ORDER_STATE {
//     NEW,PAID,USING,FINISHED,CLOSED,OVERDUE,CANCELED
// }
// 从0开始对应 新订单0、已支付1、使用中2、完成3、关闭4、逾期5、取消6
export const ORDER_STATE = [
  '新建订单/未支付',
  '已支付',
  '使用中',
  '已结束',
  '已关闭',
  '逾期',
  '已取消'
];

export function Loader() {
  return (
    <div className={styles.emptyView}>
      <ActivityIndicator text="正在加载，请稍等..." />
    </div>
  );
}

export function Empty() {
  return (
    <div className={styles.emptyView}>
      <span>暂无数据...</span>
    </div>
  );
}

export function payType(type: string) {
  if (type === 'WX') {
    return '微信支付';
  }
  if (type === 'ALI') {
    return '支付宝';
  }
  if (type === 'system') {
    return '已购买套餐扣除';
  }
  return '其他支付方式'
}

function MonitorListView({ currentPregnancy }: any) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getPackageOrders({
      'pregnancyId.equals': currentPregnancy.id,
    }).then((res: any) => {
      if (res && res.length) {
        setDataSource(res);
        setLoading(false);
      }
    });
  }

  const onClick = (id: string) => {
    Router.push({
      pathname: '/orders/detail',
      query: {
        type: 'package',
        id,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }
  if (!dataSource.length) {
    return <Empty />;
  }
  return (
    <ul className={styles.listView}>
      {
        dataSource.map((item: any) => {
          return <Card key={item.id} data={item} onClick={onClick} />;
        })}
    </ul>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(MonitorListView);
