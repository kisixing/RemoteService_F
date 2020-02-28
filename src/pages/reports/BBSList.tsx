/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-23 11:46:10
 * @Description: 产检报告列表
 */

import React from 'react';
import { List } from 'antd-mobile';
import BackButton from '@/components/BackButton';

import router from 'umi/router';
import styles from './BBSList.less';

const Item = List.Item;
const Brief = Item.Brief;
const MAPS = [
  { key: '001', title: 'B超报告', file: '/eobbook.pdf', time: '2019-10-23 12:03:54' },
  { key: '002', title: '血糖测试报告', file: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.61.pdf', time: '2019-10-23 12:54:23' },
  { key: '003', title: '心电报告', file: '', time: '2019-10-23 13:12:34' },
];

interface IProps {

}

function BBSList(props: IProps) {

  const onClick = (file: string) => {
    router.push({
      pathname: '/reports/preview',
      query: { file },
    });
  };

  return (
    <List renderHeader={() => '产检报告'} className={styles.list} >
      {MAPS.map(item => (
        <Item key={item.key} arrow="horizontal" multipleLine onClick={() => onClick(item.file)}>
          <div className={styles.title}>{item.title}</div>
          <Brief>{item.time}</Brief>
        </Item>
      ))}
      <BackButton />
    </List>
  )
}

export default BBSList;

