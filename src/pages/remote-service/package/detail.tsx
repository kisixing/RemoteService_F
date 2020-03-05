/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { router } from '@/utils/utils';
import dynamic from 'umi/dynamic';
import { Tabs, Button, WingBlank } from 'antd-mobile';
import BackButton from '@/components/BackButton';

import { CurrentPackageDetail } from './interface';
import { ConnectState } from '@/models/connect';
import styles from './Detail.less';

interface TAB {title: string|ReactNode}
const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '设备介绍'},
  {title: '设备规格'},
];


interface DETAIL_PAGE_PROPS {
  packageDetail: CurrentPackageDetail,
  packageId: number|string,
  dispatch: Dispatch
}

function Details(props: DETAIL_PAGE_PROPS) {
  const { packageDetail } = props;


  const toPay = () => {
    // 可以动态路由携带信息
    router('/pay');
  }
 
  useEffect(() => {
    if(props.packageId !== -1) {
      props.dispatch({type: 'combo/getPackageData', payload: {id: props.packageId}});
    }else {
      console.log('非法套餐id');
    }
  },[])

  return (
    <div className={styles.container}>
      <div className={styles['img-block']} />
      <Tabs tabs={tabs}>
        <div dangerouslySetInnerHTML={{__html: packageDetail.note}} />
        <div dangerouslySetInnerHTML={{__html: packageDetail.introduction}} />
        <div dangerouslySetInnerHTML={{__html: packageDetail.specification}} />
      </Tabs>
      <div className={styles.footer}>
        <div className={styles.price}>￥5000</div>
        <div className={styles.buy}>
          <Button className={styles.button} onClick={toPay}>购买</Button>
        </div>
      </div>
      <BackButton />
    </div>
  )
}


export default connect(({combo}:ConnectState ) => ({
  packageId: combo.currentPackageId,
  packageDetail: combo.currentPackageDetail 
}))(Details);
