/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 套餐详情
 */

import React,{ ReactNode, useEffect, useState } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { router } from '@/utils/utils';
import { Tabs, Button, Checkbox } from 'antd-mobile';
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

  const [isAgree,setIsAgree] = useState(false);

  const toPay = () => {
    // 可以动态路由携带信息
    router('/pay');
  }
  const handleCheckboxChange = ():void => {
    setIsAgree(isAgree => !isAgree);
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
      <div className={styles.bottom}>
        <div className={styles.agree}>
          <Checkbox checked={isAgree} onChange={handleCheckboxChange}>我同意<a href="#">《购买协议》</a></Checkbox>
          <span></span>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>￥5000</div>
          <div className={styles.buy}>
            <Button className={styles.button} onClick={toPay} disabled={!isAgree}>购买</Button>
          </div>
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
