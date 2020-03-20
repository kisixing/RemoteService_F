/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useEffect } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';
import { Tag, Button } from '@/components/antd-mobile';
import { router } from '@/utils/utils';

import { ConnectState } from '@/models/connect';
import styles from './Detail.less';

interface TAB {title: string|ReactNode}
const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '设备介绍'},
  {title: '设备规格'},
];

function Details(props: any) {
  const { dispatch, location, product } = props;

  const toPay = () => {
    // 可以动态路由携带信息
    router('/pay');
  }

  useEffect(() => {
    const { query: { id } } = location;
    dispatch({
      type: 'remoteService/getProduct',
      payload: id
    });
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.banner} style={{ backgroundImage: `url(${product.picture})` }}>
        <div className={styles.text}>
          <div>
            <span>孕期胎监套餐</span>
            <span><Tag size="middle" bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag></span>
          </div>
          <div>
            <span>有效期：截止至本孕分娩时间</span>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs}>
        <div dangerouslySetInnerHTML={{ __html: product.note }} />
        <div dangerouslySetInnerHTML={{ __html: product.introduction }} />
        <div dangerouslySetInnerHTML={{ __html: product.specification }} />
      </Tabs>
      <div className={styles.bottom}>
        <div className={styles.footer}>
          <div className={styles.price}>￥{product.price}</div>
          <div className={styles.buy}>
            <Button className={styles.button} onClick={toPay} >购买</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(({ remoteService }: ConnectState ) => ({
  product: remoteService.product,
}))(Details);
