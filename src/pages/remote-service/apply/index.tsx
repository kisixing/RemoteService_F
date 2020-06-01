/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-05 23:31:47
 * @Description: 胎监判图
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Accordion, Checkbox, Toast } from 'antd-mobile';
import moment from 'moment';
import classnames from 'classnames';
import { Button, Tag, IconFont, WhiteSpace } from '@/components/antd-mobile';
import { CTGApply, getPackageOrders, getApplyPrice } from '@/services/remote-service';
import { webpay } from '@/services/pay';
import { router } from '@/utils';
import constant from '@/utils/constants';
import styles from './index.less';

// 初始化值为一个对象时
interface IState {
  id: any;
  pregnancy: any;
  device: any;
  servicepackage: any;
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
  const [checked, setChecked] = useState<any>({});
  const [prices, setPrices] = useState([]); // 单次判图服务价格列表

  useEffect(() => {
    redirection();
  }, []);

  const redirection = () => {
    // 根据孕妇id查询已购服务
    const params = {
      'pregnancyId.equals': p1,
      'deviceId.specified': true,
      'state.equals': 2,
    };
    getPackageOrders(params).then(res => {
      if (res && res.length) {
        setIsReady(true);
        const filterArr = res.filter((e: any) => !!e.device);
        if (!filterArr.length) {
          Toast.info('没有可用套餐，请前往莲孕公众号购买...');
        } else {
          setPackageOrder(filterArr[0]);
          if (filterArr[0].service1amount === 0) {
            // 套餐服务次数已用完
            getPrice();
          }
        }
      }
    });
  };

  const getPrice = () => {
    // 单次判图服务价格
    const type = 'CTGAPPLY';
    getApplyPrice(type).then(res => {
      if (res && res.length) {
        setPrices(res);
      }
    });
  };

  const onClick = (p1: number, p2: number, p3?: number) => {
    if (checked.id) {
      // 套餐已用完，单次收费
      // 单次判图服务类型
      const type = checked.type;
      const params = { pregnancy: { id: p1 }, prenatalvisit: { id: p2 }, type };
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
        })
        .catch(error => {
          console.log('请求异常', error);
          Toast.info('判图服务扣除失败，请稍后再试...');
        });
    }
  };

  const handleCheckbox = (e: any) => {
    setChecked({ ...e });
  };

  if (isReady) {
    const { sn, service1amount, createtime, validdate, servicepackage } = packageOrder;
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
            <div className={styles.orderNo}>订单号：{sn}</div>
            <div className={styles.indate}>
              有效期：
              <i>{!!validdate ? moment(validdate).format('YYYY-MM-DD HH:mm:dd') : '分娩前'}</i>{' '}
            </div>
            <div
              className={styles.stamp}
              style={{
                backgroundImage: `url(${constant.aliyuncs}/icons/overprint_${
                  service1amount === 0 ? '3' : '6'
                }@3x.png)`,
              }}
            >
              <span>{service1amount === 0 ? '' : service1amount}</span>
            </div>
          </div>
          <div className={styles.record}>
            <div className={styles.title}>
              <IconFont type="fetus" className={styles.icon} />
              <span className={styles.name}>{'胎监判图服务'}</span>
            </div>
            <div className={styles.extra}>
              {/* <span>已使用 {service2amount - service1amount} 次</span> */}
              <span>剩余 {service1amount} 次</span>
            </div>
          </div>
          <WhiteSpace />
          {/* <Accordion className={styles.accordion}>
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
          </Accordion> */}
          {/* <div className={styles.device}>
            <div className={styles.title}>
              <IconFont type="device" className={styles.icon} />
              <span className={styles.name}>{device.devicename}</span>
            </div>
            <div className={styles.extra}>
              <span>租用</span>
              <span>{device.status} 个</span>
            </div>
          </div> */}
          {prices.map((e: any) => {
            return (
              <div key={e.id} className={styles.checkbox} onClick={() => handleCheckbox(e)}>
                <Checkbox checked={e.id === checked.id}>{`${e.name}服务费`}</Checkbox>
                <div className={styles.extra}>
                  ￥<span>{e.price}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div style={{ margin: '.48rem .3rem' }}>
          <Button
            type="primary"
            disabled={service1amount === 0 && !checked.id}
            onClick={() => onClick(Number(p1), Number(p2), packageOrder.id)}
          >
            确定
          </Button>
        </div>
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
