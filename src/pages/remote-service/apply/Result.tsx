/*
 * @Description: 判图服务扣除成功
 * @Author: Zhong Jun
 * @Date: 2020-03-12 15:05:48
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Button, Tag, IconFont } from '@/components/antd-mobile';
import { getPackageOrders } from '@/services/remote-service';
import { getPageKeyValue, router } from '@/utils';
import styles from './index.less';

interface IState {
  id: string
  pregnancy: any;
  device: any;
  servicepackage: any
  [propName: string]: any;
}

function Result() {
  const [packageOrder, setPackageOrder] = useState<IState>({
    id: '',
    pregnancy: {},
    device: {},
    servicepackage: {},
  });

  useEffect(() => {
    const id: string = getPageKeyValue('pregnancyId');
    getOrder(id);
  }, [])

  const getOrder = (id: string) => {
    const params = {
      'pregnancyId.equals': id,
      'deviceId.specified': true,
      'state.equals': 2,
    };
    getPackageOrders(params).then(res => {
      if (res && res.length) {
        const object = res.filter((e: any) => !!e.device)[0];
        setPackageOrder(object);
      }
    });
  }

  const onClick = () => {
    router('/orders')
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.resultHeader}>
          <div className={styles.bg} />
          <div className={styles.title}>判图服务扣除成功</div>
          <div className={styles.subTitle}>您的订单已提交，请耐心等候结果！</div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <IconFont type="order" className={styles.icon} />
            <div className={styles.title}>
              <span className={styles.name}>{packageOrder.servicepackage.name}</span>
              <Tag size="middle" bgcolor="#d9f0f8" color="#3fb6dc">
                {'单胎'}
              </Tag>
            </div>
            {/* 默认单胎 */}

            <span className={styles.time}>
              {moment(packageOrder.createtime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
          <div className={styles.orderNo}>订单号：{packageOrder.id}</div>
          <div className={styles.indate}>
            有效期：
            <i>
              {!!packageOrder.validdate
                ? moment(packageOrder.validdate).format('YYYY-MM-DD HH:mm:dd')
                : '分娩前'}
            </i>{' '}
          </div>
          <div
            className={classnames(styles.stamp, {
              [styles.finished]: packageOrder.service1amount === 0,
            })}
          >
            <span>{packageOrder.service1amount === 0 ? '' : packageOrder.service1amount}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0.3rem' }}>
        <Button type="primary" onClick={onClick}>
          我的订单
        </Button>
      </div>
    </div>
  );
}

export default Result;
