/*
 * @Description: 体征记录tab bar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:38:10
 */

import React, { useState } from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect'
// content 组件
import Weight from '../weight/Record';
import BloodPressure from '../blood-pressure/Record';
import BloodGlucose from '../blood-glucose/Record';
import BloodOxygen from '../blood-oxygen/Record';
import Temperature from '../temperature/Record';
import { tabs } from './config';
import styles from './TabBar.less';

function RecordsTabBar(props: any) {
  const { location:{query} } = props;
  const type = query.type || 'weight';
  const [activeTab, setActiveTab] = useState(type);

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (key === activeTab) return;
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
          <div key="blood-pressure"><BloodPressure userid={props.userid}/></div>
          <div key="blood-glucose"><BloodGlucose userid={props.userid}/></div>
          <div key="blood-oxygen"><BloodOxygen userid={props.userid}/></div>
          <div key="temperature"><Temperature userid={props.userid}/></div>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(RecordsTabBar)
