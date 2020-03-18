/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-05 23:31:47
 * @Description: 胎监判图
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Accordion, Checkbox, Toast } from 'antd-mobile';
import moment from 'moment';
import classnames from 'classnames';
import { Button, BackButton, Tag, IconFont } from '@/components/antd-mobile';
import { CTGApply, getPackageOrders } from '@/services/remote-service';
import { webpay } from '@/services/pay';
import { router } from '@/utils/utils';
import styles from './index.less';

// 初始化值为一个对象时
interface IState {
  id: string
  pregnancy: any;
  device: any;
  servicepackage: any
  [propName: string]: any;
}

function Apply(props: any) {
  const {
    location: { query },
  } = props;
  const { p1, p2, t } = query; // p1 孕册id， p2 监测档案id/判图档案id, t 套餐id

  const [packageOrder, setPackageOrder] = useState<IState>({
    id: '',
    pregnancy: {},
    device: {},
    servicepackage: {},
  });
  const [isReady, setIsReady] = useState(false);
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    redirection();
  }, []);

  const redirection = () => {
    // 根据孕妇id查询已购服务
    getPackageOrders(p1).then(res => {
      if (res && res.length) {
        setIsReady(true);
        const object = res.filter((e: any) => !!e.device)[0];
        setPackageOrder(object);
        // onClick(Number(p1), Number(p2), object.id);
      }
    });
  };

  const onClick = (p1: number, p2: number, p3?: number) => {
    if (checked) {
      // 套餐已用完，单次收费
      const params = { pregnancy: { id: p1 }, prenatalvisit: { id: p2 }, type: 'CTGAPPLY' };
      webpay(params).then((res: any) => {
        if (res && res.mwebUrl) {
          window.location.href = res.mwebUrl;
        }
      });
    } else {
      CTGApply({ pregnancyid: p1, visitid: p2, packageorderid: p3, type: 'CTGAPPLY' })
        .then(res => {
          if (res && res.sn) {
            router(`/apply/result?pregnancyId=${p1}`);
          } else {
            Toast.info('判图服务扣除失败，请稍后再试...');
          }
          // setValid(true);
        })
        .catch(error => {
          console.log('请求异常', error);
          Toast.info('判图服务扣除失败，请稍后再试...');
        });
    }
  };

  const handleCheckbox = (e: any) => {
    const checked = e.target.checked;
    setChecked(checked);
  };

  if (isReady) {
    const { id, sn, service1amount, service2amount, createtime, validdate, servicepackage, device } = packageOrder;
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.header}>
              <IconFont type="order" className={styles.icon} />
              <div className={styles.title}>
                <span className={styles.name}>{servicepackage.name}</span>
                <Tag size="middle" bgcolor="#d9f0f8" color="#3fb6dc">
                  {'单胎'}
                </Tag>
              </div>
              {/* 默认单胎 */}

              <span className={styles.time}>
                {moment(createtime).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
            <div className={styles.orderNo}>订单号：{id}</div>
            <div className={styles.indate}>
              有效期：
              <i>{!!validdate ? moment(validdate).format('YYYY-MM-DD HH:mm:dd') : '分娩前'}</i>{' '}
            </div>
            <div
              className={classnames(styles.stamp, {
                [styles.finished]: service1amount === 0,
              })}
            >
              <span>{service1amount === 0 ? '' : service1amount}</span>
            </div>
          </div>
          <Accordion className={styles.accordion}>
            <Accordion.Panel
              header={
                <div className={styles.record}>
                  <div className={styles.title}>
                    <IconFont type="fetus" className={styles.icon} />
                    <span className={styles.name}>{'胎监判图服务'}</span>
                  </div>
                  <div className={styles.extra}>
                    <span>已使用 {service2amount} 次 / </span>
                    <span>{servicepackage.sortorder} 次</span>
                  </div>
                </div>
              }
            >
              <div className={styles.recordList}>
                {service1amount > 0 ? <div>每次使用时间列表</div> : '您还未使用过...'}
              </div>
            </Accordion.Panel>
            {/* <Accordion.Panel header={<div className={styles.device}></div>}>123</Accordion.Panel> */}
          </Accordion>
          <div className={styles.device}>
            <div className={styles.title}>
              <IconFont type="device" className={styles.icon} />
              <span className={styles.name}>{device.devicename}</span>
            </div>
            <div className={styles.extra}>
              <span>租用</span>
              <span>{device.status} 个</span>
            </div>
          </div>
          {service1amount === 0 ? (
            <div className={styles.checkbox}>
              <Checkbox checked={checked} onChange={handleCheckbox}>
                单次胎监判图服务费
              </Checkbox>
              <div className={styles.extra}>
                ￥<span>0.01</span>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div style={{ margin: '.48rem .3rem' }}>
          <Button
            type="primary"
            disabled={service1amount === 0 && !checked}
            onClick={() => onClick(Number(p1), Number(p2), packageOrder.id)}
          >
            确定
          </Button>
        </div>
        {p1 && p2 ? null : <BackButton />}
      </div>
    );
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator toast text="Loading..." animating />
      </div>
    </>
  );
}

export default Apply;
