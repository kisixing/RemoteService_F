/*
 * @Description: 体征tabbar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:22:51
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './TabBar.less'

const TABS = [
  { title: '体重', key: 'weight' },
  { title: '血压', key: ' blood pressure' },
  { title: '血糖', key: ' blood glucose' },
  { title: '血氧', key: 'blood oxygen' },
  { title: '体温', key: 'temperature' },
];

interface IProps {
  children: React.ReactNode
}
function InputTabBar({children}: IProps) {

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }: any) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} animated={true} page={5} /></div>}
      </Sticky>
    );
  }

  return (
    <div>
      <StickyContainer className={styles.wrapper}>
        <Tabs
          tabs={TABS}
          initialPage={'weight'}
          swipeable={false}
          animated={false}
          renderTabBar={renderTabBar}
          // onTabClick={onTabClick}
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{
            height: '6px',
            backgroundColor: '#FFCC4A'
          }}
        >
          <div className={styles.content}>
            {children}
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default InputTabBar
