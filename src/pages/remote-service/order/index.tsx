/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 我的订单
 */

import React, { useEffect } from 'react';
import { NavBar, Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { Dispatch } from 'redux';
import { StickyContainer, Sticky } from 'react-sticky';
import BackButton from '@/components/BackButton';
import ListView from './ListView';


import { PackageListItem } from '../package/interface';
import { ServiceOrderItem, PackageOrderItem, ORDER_TYPE } from './interface';

import { connect } from 'dva';
import { ConnectState} from '@/models/connect';

import styles from './index.less';

let currentKey = '';
const tabs = [
  { title: <Title text="全部订单" />, key: 'all' },
  { title: <Title text="远程监护" />, key: 'monitoring' },
  { title: <Title text="胎监判图" />, key: 'apply' },
  { title: <Title text="在线咨询" />, key: 'consult' },
];


interface Itext { text: string, icon?: string }
function Title({ text, icon }: Itext) {
  // TODO 增加iconfont字体支持
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginLeft: '0.1rem', fontSize: '0.3rem' }}>{text}</span>
    </div>
  );
}


// 渲染顶部bar
function renderTabBar(props:any) {
  return (
    <Sticky>
      {({ style }: any) => (
        <div style={{ ...style, backgroundColor: '#fff', zIndex: 1 }}>
          <Tabs.DefaultTabBar {...props} animated={true} />
        </div>
      )}
    </Sticky>
  );
}

interface OrderProps{
  dispatch:Dispatch,
  userid:number|string,
  serviceOrderList:Array<ServiceOrderItem>,
  packageOrderList:Array<PackageOrderItem>,
  packageList: Array<PackageListItem>,
  location:{
    query: {
      type: string
    }
  }
}

function Oders(props: OrderProps) {
  const { location: { query }, userid } = props;
  const type = query.type || 'all';
  currentKey = type;
  

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (currentKey === key) {
      return;
    }
    return Router.replace(`/orders?type=${key}`);
  };
  /**  
   * 在订单中加入type用于前端判断类型
   *  fType 0 代表为远程胎监 套餐订单
   *  fType 1 代表为胎监判图 服务订单
   *  fType 2 代表为在线咨询 服务订单
   * 以 ORDER_TYPE为准
   */
  const dataSource = ():Array<ServiceOrderItem|PackageOrderItem> => {
    const{ packageOrderList,serviceOrderList,packageList } = props;
    let filterList:Array<ServiceOrderItem|PackageOrderItem> = [];
    // 类型判别 赋值fType
    if (currentKey === 'monitoring') {
      filterList = packageOrderList.map((v: PackageOrderItem) => {
        for(let i = 0; i < packageList.length; i++){
          if(packageList[i].id === v.servicepackage.id){
            v.products = packageList[i].products;
            break;
          }
        }
        v.fType = ORDER_TYPE.PACKAGE;
        return v;
      });
    }else if (currentKey === 'apply') {
      filterList = serviceOrderList.filter((v:ServiceOrderItem) => v.type === "胎监判图");
      filterList = serviceOrderList.map(v => {v.fType = ORDER_TYPE.APPLY;return v;});
    }else if (currentKey === 'consult') {
      filterList = serviceOrderList.filter((v:ServiceOrderItem) => v.type !== "胎监判图");
      filterList = serviceOrderList.map(v => {v.fType = ORDER_TYPE.CONSULT;return v;});
    }else if(currentKey){
      // @ts-ignore
      let p = packageOrderList.map((v: PackageOrderItem) => {
        v.fType = ORDER_TYPE.PACKAGE;
        for(let i = 0; i < packageList.length; i++){
          if(packageList[i].id === v.servicepackage.id){
            v.products = packageList[i].products;
            break;
          }
        }
        return v;
      });
      let o = serviceOrderList.map(v => {
        if(v.type === "胎监判图"){
          v.fType = ORDER_TYPE.APPLY;
        }else{
          v.fType = ORDER_TYPE.CONSULT;
        }
        return v;
      });
      filterList = p.concat(o);
    }
    return filterList;
  };

  const onClick = () => {
    Router.push('/packages')
  };

  useEffect(() => {
    props.dispatch({type: 'combo/getPackage'});
    props.dispatch({type: 'order/getPackageOrders',payload: {pregnancyId: props.userid}});
    props.dispatch({type: 'order/getServiceOrders',payload: {pregnancyId: props.userid}});
  },[]);

  return (
    <div className="page">
      <NavBar mode="light" rightContent={<div onClick={onClick}>购买套餐</div>}>
        我的订单
      </NavBar>
      <StickyContainer className={styles.wrapper}>
        <Tabs
          tabs={tabs}
          initialPage={type}
          swipeable={false}
          animated={false}
          renderTabBar={renderTabBar}
          onTabClick={onTabClick}
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{
            height: '6px',
            backgroundColor: '#FFCC4A',
          }}
        >
          <div key={type} className={styles.content}>
            <ListView dataSource={dataSource()} />
          </div>
        </Tabs>
      </StickyContainer>
      <BackButton />
    </div>
  );
}

export default connect(({global,order,combo}:ConnectState) => ({
  userid: global.currentPregnancy.id,
  serviceOrderList:order.serviceOrderList,
  packageOrderList:order.packageOrderList,
  packageList:combo.packageList
}))(Oders);
