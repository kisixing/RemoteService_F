/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:09:31
 * @Description: 在线咨询首页
 */

import React from 'react';
import BackButton from '@/components/BackButton';
import { IconFont, Tag } from '@/components/antd-mobile';
import { router } from '@/utils/utils';

import styles from './index.less';

const data = [
  {
    key: 'online-visit',
    title: '在线复诊',
    route: '/consultation/doctor',
    icon: 'consultationrecord',
    tag: '找医生',
    tagColor: '#fbaca2',
    type: '',
  },
  {
    key: 'quick-consulting',
    title: '快速咨询',
    route: '/consultation/team/快速咨询',
    icon: 'yiliaoweisheng-2',
    tag: '解答快',
    tagColor: '#fed366',
    type: 'team',
  },
  {
    key: 'diabetes-line',
    title: '糖尿病专线',
    route: '/consultation/team/糖尿病专线',
    icon: 'yiliaoweisheng-12',
    tag: '专病',
    tagColor: '#8ce0ca',
    type: 'team',
  },
  {
    key: 'hypertensive-line',
    title: '高血压专线',
    route: '/consultation/team/高血压专线',
    icon: 'yiliaoweisheng-7',
    tag: '专病',
    tagColor: '#a4a8f6',
    type: 'team',
  },
  {
    key: 'highrisk -visit',
    title: '复杂高危',
    route: '/consultation/team/复杂高危',
    icon: 'yiliaoweisheng-11',
    tag: '专病',
    tagColor: '#d1a6fc',
    type: 'team',
  },
];

function Consultation() {

  const onClick = (route: string) => router(route)

  return (
    <>
      <div className={styles.container}>
        {data.map(item => (
          <div key={item.key} onClick={() => onClick(item.route)}>
            <div className={styles.header}>
              <IconFont type={item.icon} size=".6rem" style={{ marginRight: '.24rem' }} />
              <Tag size="middle" bgcolor={item.tagColor}>
                {item.tag}
              </Tag>
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </div>
      <BackButton />
    </>
  );
}

export default Consultation;
