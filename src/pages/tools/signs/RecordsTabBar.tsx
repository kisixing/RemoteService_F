/*
 * @Description: 体征记录tab bar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:38:10
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';

// content 组件
import Weight from '../weight/Record';
import BloodPressure from '../blood-pressure/Record';
import BloodGlucose from '../blood-glucose/Record';
import BloodOxygen from '../blood-oxygen/Record';
import Temperature from '../temperature/Record';
import { tabs } from './config';
import styles from './TabBar.less';

function RecordsTabBar(props: any) {
  const {
    location: { query },
  } = props;
  const type = query.type || 'weight';
  // document.title = TABS.filter(e => e.key === type)[0]['title'];

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (key === type) {
      return;
    }
    Router.replace(`/signs/record?type=${key}`);
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

  const content = (key: string) => {
    if (key === 'weight') {
      return <Weight />;
    }
    if (key === 'blood-pressure') {
      return <BloodPressure />;
    }
    if (key === 'blood-glucose') {
      return <BloodGlucose />;
    }
    if (key === 'blood-oxygen') {
      return <BloodOxygen />;
    }
    if (key === 'temperature') {
      return <Temperature />;
    }
    return <div style={{ margin: '1rem', textAlign: 'center' }}>没有定义{type}这个体征组件</div>;
  };

  return (
    <div>
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
            {content(type)}
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  );
}

export default RecordsTabBar
