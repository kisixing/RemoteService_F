/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:41:34
 * @Description: 我的订单
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { Dispatch } from 'redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { NavBar, Tabs } from 'antd-mobile';
import { ConnectState} from '@/models/connect';
import ListView from './ListView';

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
  dispatch: Dispatch
  currentPregnancy: any
  location: {
    query: {
      type: string
    }
  }
}

function Oders(props: IProps) {
  const {
    location: { query },
    currentPregnancy: { id },
  } = props;
  const type = query.type || 'package';
  const [currentKey, setCurrentKey] = useState(type);
  const [data, setData] = useState([])

  useEffect(() => {
    // props.dispatch({ type: 'order/getPackageOrders', payload: { pregnancyId: id } });
    // props.dispatch({ type: 'order/getServiceOrders', payload: { pregnancyId: id } });
  }, []);

  const fetchData = () => {

  }

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (currentKey === key) {
      return;
    }
    // 路由加type，便于progress进度条加载显示
    return Router.replace(`/orders?type=${key}`);
  };

  const onClick = () => {
    Router.push('/packages');
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
            <ListView dataSource={data} />
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

export default connect(({ global, order, combo }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  serviceOrderList: order.serviceOrderList,
  packageOrderList: order.packageOrderList,
  packageList: [],
}))(Oders);
