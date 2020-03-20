/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 22:57:14
 * @Description: 孕妇学校 宣教内容
 * 需要注意路由入口及tab切换问题，约定入口路由'/school?type=article|video'
 */

import React from 'react';

import { Tabs } from 'antd-mobile';
import Router from 'umi/router';
import { StickyContainer, Sticky } from 'react-sticky';

import { IconFont } from '@/components/antd-mobile';
import Video from './Video';
import Article from './Article';
import styles from './TabBar.less';

const tabs = [
  { title: <Title text="文章" icon="icon-article" />, key: 'article' },
  { title: <Title text="视频" icon="_video" />, key: 'video' },
];
let currentKey = '';

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} animated={true} /></div>}
    </Sticky>
  );
}

interface Itext { text: string, icon?: string }
function Title({ text, icon }: Itext) {
  // TODO 增加iconfont字体支持
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconFont type={icon} size="0.3rem" />
      <span style={{ marginLeft: '0.1rem', fontSize: '0.3rem' }}>{text}</span>
    </div>
  );
}

const SchoolTabBar = (props: any) => {
  const { location: { query } } = props;
  const type = query.type;
  currentKey = type;

  const onTabClick = (tab: any, index: number) => {
    const key = tab.key;
    if (currentKey === key) {
      return;
    }
    return Router.replace(`/school?type=${key}`);
  }

  return (
    <div className="page">
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
            height: '5px',
            marginLeft: '12.5%',
            backgroundColor: '#FFCC4A'
          }}
        >
          <div key={type} className={styles.content}>
            {type === 'article' ? <Article /> : <Video />}
          </div>
          {/* <div key="article" className={styles.content}>
            <Article />
          </div>
          <div key="video" className={styles.content}>
            <Video />
          </div> */}
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default SchoolTabBar;


