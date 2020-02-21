/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 22:57:14
 * @Description: 孕妇学校 宣教内容
 */

import React from 'react';

import { Tabs, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import Video from './Video';
import Article from './Article';
import styles from './TabBar.less';

const tabs = [
  { title: <Title text="文章" />, key: 't1' },
  { title: <Title text="视频" />, key: 't2' },
];

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>
  );
}

interface Itext { text: string, icon?: string }
function Title({ text, icon }: Itext) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon type="check-circle" size="xs" />
      <span style={{ marginLeft: '0.1rem', fontSize: '0.3rem' }}>{text}</span>
    </div>
  );
}

const SchoolTabBar = () => {
  return (
    <div className="page">
      <StickyContainer className={styles.wrapper}>
        <Tabs
          tabs={tabs}
          initialPage={'t1'}
          swipeable={false}
          animated={false}
          renderTabBar={renderTabBar}
          tabBarInactiveTextColor="#787878"
          tabBarUnderlineStyle={{ width: '25%', height: '5px', marginLeft: '12.5%', backgroundColor: '#FFCC4A' }}
          // prefixCls="11111111111111111"
        >
          <div key="t1" className={styles.content}>
            <Article />
          </div>
          <div key="t2" className={styles.content}>
            <Video />
          </div>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default SchoolTabBar;


