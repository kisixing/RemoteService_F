import React, {useEffect} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import { router } from '@/utils/utils';
import styles from './MyOrder.less';
import { ConnectState } from '@/models/connect';

function MyOrder(props: any) {
  const { dispatch, myOrderList  } = props;



  useEffect(() => {
    console.log('获取用户订单信息');
    dispatch({
      type: 'combo/getMyOrder'
    })
  });

  return (
    <div className={styles['my-order']}>
      <NavBar
        className={styles['nav-bar']}
        leftContent={<Icon type='left'/>}
        onLeftClick={() => router('/')}
      >我的订单</NavBar>
      {/* TODO any*/}
      {myOrderList.map((listItem:any) => (
        <div>{listItem.name}</div>
      ))}
    </div>
  )
}

export default connect(({combo}: ConnectState) => {
  return {
    myOrderList: combo.myOrderList
  }
})(MyOrder)
