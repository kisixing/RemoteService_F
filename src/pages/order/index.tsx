/*
 * @Description: 套餐购买入口、判断用户是否已经购买套餐
 * @Author: Zhong Jun
 * @Date: 2020-02-19 14:48:28
 */

import React from 'react';
import { connect } from 'dva';

import PackageList from './PackageList';
import MyOrder from './MyOrder';

function Order() {
  // 是否已购买
  const isOrder = false;
  if (isOrder) {
    return <MyOrder />;
  }
  return <PackageList />;
}

export default connect(({ loading }) => ({
  loading: loading,
}))(Order);
