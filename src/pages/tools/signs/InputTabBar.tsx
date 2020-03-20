/*
 * @Description: 体征tabbar
 * @Author: Zhong Jun
 * @Date: 2020-03-06 17:22:51
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect'
// content 组件
import Weight from '../weight/Input';
import BloodPressure from '../blood-pressure/Input';
import BloodGlucose from '../blood-glucose/Input';
import BloodOxygen from '../blood-oxygen/Input';
import Temperature from '../temperature/Input';
import { tabs } from './config';
import styles from './TabBar.less'

function InputTabBar(props: any) {
  const { location: { query } } = props;
  const type = query.type || 'weight';
  // document.title = TABS.filter(e => e.key === type)[0]['title'];
  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (key === type) {
      return;
    }
    Router.replace(`/signs/input?type=${key}`)
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

  const content = (key: string) => {
    if (key === 'weight') {
      return <Weight userid={props.userid}/>
    }
    if (key === 'blood-pressure') {
      return <BloodPressure userid={props.userid}/>
    }
    if (key === 'blood-glucose') {
      return <BloodGlucose userid={props.userid}/>
    }
    if (key === 'blood-oxygen') {
      return <BloodOxygen userid={props.userid}/>
    }
    if (key === 'temperature') {
      return <Temperature userid={props.userid}/>
    }
    return <div style={{ margin: '1rem', textAlign: 'center' }}>没有定义{type}这个体征组件</div>
  }

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

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy.id
}))(InputTabBar);
