/*
 * @Description: 体征tabbar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:22:51
 */

import React,{useState} from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
// content 组件
import Weight from '../weight/Input';
import BloodPressure from '../blood-pressure/Input';
import BloodGlucose from '../blood-glucose/Input';
import BloodOxygen from '../blood-oxygen/Input';
import Temperature from '../temperature/Input';
import { tabs } from './config';
import styles from './TabBar.less'

function InputTabBar() {

  const [activeTab, setActiveTab] = useState("weight");
  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (key === activeTab) {
      return;
    }
    setActiveTab(key);
  }

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
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{
            height: '6px',
            backgroundColor: '#FFCC4A',
          }}
          
        >
          <div key="weight"><Weight userid={1}/></div>
          <div key="blood-pressure"><BloodPressure/></div>
          <div key="blood-glucose"><BloodGlucose/></div>
          <div key="blood-oxygen"><BloodOxygen/></div>
          <div key="temperature"><Temperature/></div>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

export default InputTabBar;
