/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 我的订单详情
 */

import React,{ReactNode} from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import BackButton from '@/components/BackButton';
import { NavBar, Icon } from 'antd-mobile';

import { ORDER_TYPE } from './interface';
import { PackageOrderItem, ServiceOrderItem } from '@/pages/remote-service/order/interface';
import { ConnectState } from '@/models/connect';

import ApplyDetail from './Apply/ApplyDetail';
import ConsultDetail from './Consult/ConsultDetail';
import MonitorDetail from './Monitor/MonitorDetail';

import styles from './Detail.less';
interface DetailProp{
  currentOrder: PackageOrderItem|ServiceOrderItem
}

function details(props: DetailProp) {
  
  
  const renderContent = ():ReactNode => {
    switch(props.currentOrder.fType){
      case ORDER_TYPE.PACKAGE:
        // @ts-ignore
        return <MonitorDetail data={props.currentOrder}/>
      case ORDER_TYPE.APPLY:
        // @ts-ignore
        return <ApplyDetail data={props.currentOrder} />
      case ORDER_TYPE.CONSULT:
        // @ts-ignore
        return <ConsultDetail data={props.currentOrder} />
      default:
        return <div>请确认订单信息</div>
    }
  }


  return (
    <div className={styles.container}>
      <NavBar 
        mode="light"
        leftContent={<Icon type="left"/>}
        onLeftClick={() => Router.push('/orders')}
      >订单详情</NavBar>
        {renderContent()}
      <BackButton/>
    </div>
  )
}

export default connect(({order}: ConnectState) => ({
  currentOrder: order.currentOrder
}))(details);
