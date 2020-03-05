import React, {useEffect} from 'react';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import { connect } from 'dva';
import { router } from '@/utils/utils';
import styles from './MyOrder.less';
import { ConnectState } from '@/models/connect';

const tabs = [
  {title: '全部订单'},
  {title: '远程监护'},
  {title: '在线咨询'}
];




function MyOrder(props: any) {
  const { dispatch  } = props;

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
      <Tabs
        tabs={tabs}
      >

      </Tabs>
    </div>
  )
}

export default connect(({combo}: ConnectState) => {
  return {
    myOrderList: combo.myOrderList
  }
})(MyOrder)
