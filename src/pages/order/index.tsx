/*
 * @Description: 套餐购买入口、判断用户是否已经购买套餐
 * @Author: Zhong Jun
 * @Date: 2020-02-19 14:48:28
 */

import React, {useState} from 'react';
import { connect } from 'dva';

import Package from './Package';
import MyOrder from './MyOrder';

import styles from './index.less';

function Order() {
  // TODO 判断用户是否已购买
  const [isOrder, setIsOrder] = useState(true);

  return (
    <div className={styles.wapper}>
      {isOrder ? <MyOrder /> : <Package/>}
    </div>
  )
}

export default connect(({ loading }:any) => ({
  loading: loading,
}))(Order);
