/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:09:31
 * @Description: 在线咨询首页
 */

import React from 'react';
import { IconFont, Tag } from '@/components/antd-mobile';
import Router from 'umi/router';

import styles from './index.less';

const data = [
  {
    key: 'online-visit',
    title: '在线复诊',
    route: '/consultation/doctor',
    icon: 'doctor',
    tag: '找医生',
    tagColor: '#fbaca2',
    type: '',
  },
  {
    key: 'quick-consulting',
    title: '快速咨询',
    route: '/consultation/team/quick',
    icon: 'fast',
    tag: '解答快',
    tagColor: '#fed366',
    color: '#f99a8e',
    type: 'team',
  },
  {
    key: 'diabetes-line',
    title: '糖尿病专线',
    route: '/consultation/team/diabetes',
    icon: 'bloodsugar1',
    tag: '专病',
    tagColor: '#8ce0ca',
    color: '#8ef990',
    type: 'team',
  },
  {
    key: 'hypertensive-line',
    title: '高血压专线',
    route: '/consultation/team/hypertensive',
    icon: 'bloodpressure',
    tag: '专病',
    tagColor: '#a4a8f6',
    color: '#878fff',
    type: 'team',
  },
  {
    key: 'highrisk -visit',
    title: '复杂高危',
    route: '/consultation/team/highrisk',
    icon: 'risk',
    tag: '专病',
    tagColor: '#d1a6fc',
    color: '#e28ef9',
    type: 'team',
  },
];

function Consultation() {

  const onClick = ({ route, color, icon }: any) =>
    Router.push({
      pathname: route,
      query: { color, icon },
    });

  return (
    <div className={styles.container}>
      {data.map(item => (
        <div key={item.key} onClick={() => onClick(item)}>
          <div className={styles.header}>
            <IconFont
              type={item.icon}
              size="0.8rem"
              color="#150f55"
              style={{ marginRight: '.24rem' }}
            />
            <Tag size="middle" bgcolor={item.tagColor} color="#150f55">
              <span style={{ fontSize: '0.24rem' }}>{item.tag}</span>
            </Tag>
          </div>
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Consultation;
