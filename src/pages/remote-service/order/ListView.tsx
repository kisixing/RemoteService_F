/*
 * @Description: 我的订单列表页 列表内容不是特别多，暂时不考虑长列表数据优化
 * @Author: Zhong Jun
 * @Date: 2020-03-05 11:42:06
 */

import React, {ReactNode} from 'react';
import Router from 'umi/router';
// import { IconFont, Tag, Touchable, Button } from '@/components/antd-mobile';

import MonitorCard from './MonitorCard';
import ApplyCard from './ApplyCard';
import ConsultCard from './ConsultCard';

import styles from './ListView.less';

interface IProps {
  dataSource?: any[]
}


function ListView({ dataSource = [] }: IProps) {
  const onClick = () => {
    Router.push('/orders/detail')
  };

  const renderListItem = (data: {type: string, name:string}):ReactNode => {
    switch(data.type){
      case 'monitoring':
        return  <MonitorCard data={data}/>;
      case 'apply':
        return <ApplyCard data={data}/>;
      case 'consult':
        return <ConsultCard data={data} />
      default:
        return <div>未知订单类型</div>
    }
  }

  return (
    <div className={styles.listView}>
      {dataSource.map(e => {
        return (
          <div key={e.key} onClick={onClick} className={styles.item}>
            {renderListItem(e)}
          </div>
        );
      })}
    </div>
  )
}

export default ListView
