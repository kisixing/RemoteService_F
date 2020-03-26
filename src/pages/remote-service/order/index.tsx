/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 我的订单
 */

import React from 'react';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';
import { NavBar, Tabs } from 'antd-mobile';

import MonitorListView from './Monitor/ListView';
import ApplyListView from './Apply/ListView';
import ConsultListView from './Consult/ListView';

import styles from './index.less';

const tabs = [
  { title: '远程监护', key: 'package' },
  { title: '胎监判图', key: 'apply' },
  { title: '在线咨询', key: 'consult' },
];

// 渲染顶部bar
function renderTabBar(props: any) {
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

interface IProps{
  location: {
    query: {
      type: string
    }
  }
}

function Oders(props: IProps) {
  const {
    location: { query },
  } = props;
  const currentKey = query.type || 'package';

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (currentKey === key) {
      return;
    }
    // 路由加type，便于progress进度条加载显示
    return Router.replace(`/orders?type=${key}`);
  };

  const renderListView = () => {
    if (currentKey === 'package') {
      return <MonitorListView />
    }
    if (currentKey === 'apply') {
      return <ApplyListView />;
    }
    if (currentKey === 'consult') {
      return <ConsultListView />;
    }
    return null
  }

  const onClick = () => Router.push('/packages');

  return (
    <div className="page">
      <NavBar mode="light" rightContent={<div onClick={onClick}>购买套餐</div>}>
        我的订单
      </NavBar>
      <StickyContainer className={styles.wrapper}>
        <Tabs
          tabs={tabs}
          page={currentKey}
          swipeable={false}
          animated={false}
          renderTabBar={renderTabBar}
          onTabClick={onTabClick}
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{
            height: '6px',
            backgroundColor: '#FFCC4A',
          }}
        />
          {renderListView()}
      </StickyContainer>
    </div>
  );
}

export default Oders;
