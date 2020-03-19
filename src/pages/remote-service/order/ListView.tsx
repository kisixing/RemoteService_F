/*
 * @Description: 我的订单列表页 列表内容不是特别多，暂时不考虑长列表数据优化
 * @Author: Zhong Jun
 * @Date: 2020-03-05 11:42:06
 */

import React, {ReactNode} from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { Dispatch } from 'redux';;
// import { IconFont, Tag, Touchable, Button } from '@/components/antd-mobile';
import { ServiceOrderItem, PackageOrderItem, ORDER_TYPE } from './interface';
import MonitorCard from './Monitor/MonitorCard';
import ApplyCard from './Apply/ApplyCard';
import ConsultCard from './Consult/ConsultCard';

import styles from './ListView.less';

interface IProps {
  dataSource?: Array<ServiceOrderItem|PackageOrderItem>,
  dispatch: Dispatch
}


function ListView({ dataSource = [], dispatch }: IProps) {
  const onClick = (e: ServiceOrderItem|PackageOrderItem) => {
    dispatch({type: 'order/setCurrentOrder', payload: e})
    Router.push('/orders/detail');
  };

  const renderListItem = (data: ServiceOrderItem|PackageOrderItem ):ReactNode => {
    switch(data.fType){
      case ORDER_TYPE.PACKAGE:
        // @ts-ignore
        return  <MonitorCard data={data}/>;
      case ORDER_TYPE.APPLY:
        // @ts-ignore
        return <ApplyCard data={data}/>;
      case ORDER_TYPE.CONSULT:
        // @ts-ignore
        return <ConsultCard data={data} />
      default:
        return <div>未知订单类型</div>
    }
  }

  return (
    <div className={styles.listView}>
      {dataSource.map(e => {
        return (
          <div key={e.id}  className={styles.item}>
            <div onClick={() => onClick(e)}>
              {renderListItem(e)}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default connect()(ListView);
