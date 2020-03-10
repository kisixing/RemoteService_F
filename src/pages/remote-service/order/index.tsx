/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 我的订单
 */

import React from 'react';
import { NavBar, Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';
import BackButton from '@/components/BackButton';
import ListView from './ListView';
import { OrderState } from './config';


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

// 根据状态确定 路径|显示字段
function getTextByState(state: number) {
  const orderStateArr = ['状态未知','未绑定','使用中','逾期','已结束'];
  return orderStateArr[state];
} 

function Oders(props: any) {
  const { location: { query } } = props;
  const type = query.type || 'all';
  currentKey = type;

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (currentKey === key) {
      return;
    }
    return Router.replace(`/orders?type=${key}`);
  };
  
  const dataSource = () => {
    if (currentKey === 'monitoring') {
      return [
        {name: '一个月胎监服务', key: 'm-1', state: OrderState.NULL, stateText: ''},
        {name: '二个月胎监服务', key: 'm-2', state: OrderState.NULL, stateText: ''}
      ]
    }
    if (currentKey === 'consult') {
      return [
        {name: '在线咨询1', key: 'c-1', state: OrderState.NULL, stateText: ''},
        {name: '在线咨询2', key: 'c-2', state: OrderState.NULL, stateText: ''},
        {name: '在线咨询3', key: 'c-3', state: OrderState.NULL, stateText: ''},
        {name: '在线咨询4', key: 'c-4', state: OrderState.NULL, stateText: ''},
        {name: '在线咨询4', key: 'c-5', state: OrderState.NULL, stateText: ''},
        {name: '在线咨询4', key: 'c-6', state: OrderState.NULL, stateText: ''}
      ]
    }
    if (currentKey === 'apply') {
      return [
        {name: '胎监判图1', key: 'a-1', state: OrderState.NULL,stateText: ''},
        {name: '胎监判图2', key: 'a-2', state: OrderState.NULL,stateText: ''},
        {name: '胎监判图3', key: 'a-3', state: OrderState.NULL,stateText: ''},
        {name: '胎监判图4', key: 'a-4', state: OrderState.NULL,stateText: ''}
      ]
    }
    return [
      {name: '一个月胎监服务', key: 'm-1', state: OrderState.TO_BE_BOUND,textstateText: ''},
      {name: '二个月胎监服务', key: 'm-2', state: OrderState.IN_LATE,stateText: ''},
      {name: '在线咨询1', key: 'c-1', state: OrderState.IN_USE,stateText: ''},
      {name: '在线咨询2', key: 'c-2', state: OrderState.END,stateText: ''},
      {name: '在线咨询3', key: 'c-3', state: '',stateText: ''},
      {name: '在线咨询4', key: 'c-4', state: '',stateText: ''},
      {name: '在线咨询4', key: 'c-5', state: '',stateText: ''},
      {name: '在线咨询4', key: 'c-6', state: '',stateText: ''},
      {name: '胎监判图1', key: 'a-1', state: '',stateText: ''},
      {name: '胎监判图2', key: 'a-2', state: '',stateText: ''},
      {name: '胎监判图3', key: 'a-3', state: '',stateText: ''},
      {name: '胎监判图4', key: 'a-4', state: '',stateText: ''}
    ]
  };

  const onClick = () => {
    Router.push('/packages')
  };

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
            <ListView dataSource={dataSource().map((v:any) => {v.stateText = getTextByState(v.state); return v; })} />
          </div>
        </Tabs>
      </StickyContainer>

      <BackButton />
    </div>
  );
}

export default Oders;
