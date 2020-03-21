/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tabs } from 'antd-mobile';
import { Tag, Button, IconFont } from '@/components/antd-mobile';
import { router } from '@/utils/utils';

import { ConnectState } from '@/models/connect';
import styles from './Detail.less';

interface TAB {title: string|ReactNode}

const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '设备介绍'},
  {title: '设备规格'},
];
const format = 'YYYY-MM-DD'

function Details({ dispatch, location, product, currentPackage }: any) {

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
          <div className={styles.name}>
            <span>{currentPackage.name}</span>
            <Tag bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag>
          </div>
          <div className={styles.indate}>
            有效期：
            {`${moment().format(format)} ~ ${moment().add(currentPackage.validdate, 'days').format(format)}`}
            {`，${currentPackage.validdate} 天`}
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <Tabs
          tabs={tabs}
          swipeable={false}
          animated={true}
          tabBarUnderlineStyle={{
            height: '5px',
            backgroundColor: '#FFCC4A',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: product.note }} />
          <div dangerouslySetInnerHTML={{ __html: product.introduction }} />
          <div dangerouslySetInnerHTML={{ __html: product.specification }} />
        </Tabs>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <IconFont type="serve" size="0.64rem" />
          <span className={styles.price}>
            <IconFont type="fl-renminbi" size="0.32rem" />
            <span>{currentPackage.price}</span>
          </span>
        </div>
        <Button inline type="primary" onClick={toPay} >购买</Button>
      </div>
    </div>
  )
}


export default connect(({ remoteService }: ConnectState ) => ({
  product: remoteService.product,
  currentPackage: remoteService.currentPackage
}))(Details);
