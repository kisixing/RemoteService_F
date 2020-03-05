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

import styles from './index.less';

let currentKey = '';
const tabs = [
  { title: <Title text="全部订单" />, key: 'all' },
  { title: <Title text="远程监护" />, key: 'monitoring' },
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


function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }: any) => (
        <div style={{ ...style, paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: '#fff', zIndex: 1 }}>
          <Tabs.DefaultTabBar {...props} animated={true} />
        </div>
      )}
    </Sticky>
  );
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
      return ['一个月胎监服务', '二个月胎监服务'];
    }
    if (currentKey === 'consult') {
      return ['在线咨询1', '在线咨询2', '在线咨询3', '在线咨询4', '在线咨询5', '在线咨询6'];
    }
    return ['一个月胎监服务', '二个月胎监服务', '在线咨询1', '在线咨询2', '在线咨询3', '在线咨询4', '在线咨询5', '在线咨询6'];
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
            width: '25%',
            height: '6px',
            marginLeft: '5%',
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

export default Oders;
