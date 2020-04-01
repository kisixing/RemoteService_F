/*
 * @Description: 体征记录tab bar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:38:10
 */

import React, { useState } from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
// content 组件
import Weight from '../weight/Record';
import BloodPressure from '../blood-pressure/Record';
import BloodGlucose from '../blood-glucose/Record';
import BloodOxygen from '../blood-oxygen/Record';
import Temperature from '../temperature/Record';
import { tabs } from './config';
import styles from './TabBar.less';

function RecordsTabBar({ location: { query } }: any) {

  const type = query.type || 'blood-pressure';
  const [activeTab, setActiveTab] = useState(type);

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (key === activeTab) {
      return;
    };
    setActiveTab(key)
  };

  function renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }: any) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} animated={true} page={5} />
          </div>
        )}
      </Sticky>
    );
  }

  return (
    <div>
      <StickyContainer className={styles.wrapper}>
        <Tabs
          tabs={tabs}
          page={activeTab}
          swipeable={false}
          animated={false}
          renderTabBar={renderTabBar}
          onTabClick={onTabClick}
          // 默认预加载页面1个
          // prerenderingSiblingsNumber={0}
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{
            height: '6px',
            backgroundColor: '#FFCC4A',
          }}
        >
          <div key="weight"><Weight /></div>
          <div key="blood-pressure"><BloodPressure /></div>
          <div key="blood-glucose"><BloodGlucose /></div>
          <div key="blood-oxygen"><BloodOxygen /></div>
          <div key="temperature"><Temperature /></div>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

export default RecordsTabBar;
