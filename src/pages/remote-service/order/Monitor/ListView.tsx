/*
 * @Description: 套餐订单列表
 * @Author: Zhong Jun
 * @Date: 2020-03-26 15:26:17
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tag, IconFont } from '@/components/antd-mobile';
import { getPackageOrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';

import styles from './ListView.less';

function MonitorListView({ currentPregnancy }: any) {
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
      }
    });
  }

  const onClick = (value: object) => {};

  return (
    <ul className={styles.listView}>
      {dataSource &&
        dataSource.length > 0 &&
        dataSource.map((item: any) => {
          return (
            <li key={item.id} className={styles.item} onClick={() => onClick(item)}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <IconFont type="order" size="0.36rem" />
                  <span className={styles.name}>{item.servicepackage && item.servicepackage.name}</span>
                  <Tag size="middle" bgcolor="#d9f0f8" color="#3fb6dc">
                    {'单胎'}
                  </Tag>
                </div>
                <div className={styles.div}>
                  订单号：<span className={styles.time}>{item.sn}</span>
                </div>
                <div className={styles.div}>
                  有效期：
                  <span className={styles.time}>
                    {moment(item.createtime).format('YYYY-MM-DD')} ~ {moment(item.validdate).format('YYYY-MM-DD')}
                  </span>
                </div>
                {/* 从0开始对应 新订单、已支付、使用中、完成、关闭、逾期、取消 */}
                <div
                  className={styles.overprint}
                  style={{ backgroundImage: `url(/images/icon/overprint_${!!item.state ? item.state : 1}@3x.png)` }}
                />
              </div>
              <div className={styles.content}>
                <div>
                  <IconFont type="fetus" size="0.36rem" />
                  <span>胎监判图服务</span>
                  <span className={styles.right}>{item.service1amount + item.service2amount} 次</span>
                </div>
                <div>
                  <IconFont type="device" size="0.36rem" />
                  <span>{item.device && item.device.devicename}</span>
                  <span className={styles.right}>租用 -- 个</span>
                </div>
                <div>
                  <IconFont type="refund" size="0.36rem" />
                  <span style={{ fontSize: '0.32rem', color: '#150f55' }}>{item.price}</span>
                  <span style={{ marginLeft: '.32rem', fontSize: '0.2rem', color: '#5c6187' }}>
                    (含押金￥ {item.cashPledge || 1099})
                  </span>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(MonitorListView);
