/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-23 11:46:10
 * @Description: 产检报告列表
 */

import React from 'react';
import { List } from 'antd-mobile';

import { router } from '@/utils/utils';

const Item = List.Item;
const Brief = Item.Brief;

interface IProps {

}

function BBSList(props: IProps) {
  return (
    <List renderHeader={() => '产检报告'} className="page">
      <Item arrow="horizontal" multipleLine onClick={() => router('/reports/preview')}>
        Title <Brief>subtitle</Brief>
      </Item>
      <Item arrow="horizontal" multipleLine onClick={() => {}}>
        Title <Brief>subtitle</Brief>
      </Item>
    </List>
  )
}

export default BBSList;

