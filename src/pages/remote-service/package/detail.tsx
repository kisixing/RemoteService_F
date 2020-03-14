/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Tabs, Button } from 'antd-mobile';
import { Tag } from '@/components/antd-mobile';
import { router } from '@/utils/utils';
import BackButton from '@/components/BackButton';

import { CurrentPackageDetail, PackageListItem } from './interface';
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
  currentPackageId: number|string,
  packageList: Array<PackageListItem>,
  dispatch: Dispatch
}

function Details(props: DETAIL_PAGE_PROPS) {


  const { packageDetail, packageList, currentPackageId } = props;
  const currentPackageData = packageList.find(item => item.id === currentPackageId);
  console.log(currentPackageData);

  const toPay = () => {
    // 可以动态路由携带信息
    router('/pay');
  }

  useEffect(() => {
    if(currentPackageId !== -1) {
      props.dispatch({type: 'combo/getPackageData', payload: {id: props.packageId}});
    }else {
      console.log('非法套餐id');
    }
  },[])

  return (
    <div className={styles.container}>
      <div className={styles['img-block']}>
      <div className={styles.title}>
          <div>
            <span>孕期胎监套餐</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span><Tag size="middle" bgcolor="#D9F0F8" color="#3FB6DC">单胎</Tag></span>
          </div>
          <div>
            <span>有效期：截止至本孕分娩时间</span>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs}>
        <div dangerouslySetInnerHTML={{__html: packageDetail.note}} />
        <div dangerouslySetInnerHTML={{__html: packageDetail.introduction}} />
        <div dangerouslySetInnerHTML={{__html: packageDetail.specification}} />
      </Tabs>
      <div className={styles.bottom}>
        <div className={styles.footer}>
          <div className={styles.price}>￥{currentPackageData.price}</div>
          <div className={styles.buy}>
            <Button className={styles.button} onClick={toPay} >购买</Button>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  )
}


export default connect(({combo}:ConnectState ) => ({
  currentPackageId: combo.currentPackageId,
  packageDetail: combo.currentPackageDetail,
  packageList: combo.packageList
}))(Details);
