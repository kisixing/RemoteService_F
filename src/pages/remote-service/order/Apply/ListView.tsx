import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { getServiceOrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';
// import { getPageKeyValue } from '@/utils';
import { Loader, Empty } from '../Monitor/ListView';
import Card from './Card';

import styles from '../Monitor/ListView.less';

function ApplyListView({ currentPregnancy, p1, p2 }: any) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // const p2 = getPageKeyValue('p2');
    getServiceOrders({
      'pregnancyId.equals': currentPregnancy.id,
      'prenatalvisitId.equals': p2,
    }).then((res: any) => {
      setLoading(false);
      if (res && res.length) {
        setDataSource(res);
      }
    });
  }, []);

  const onClick = (id: string) => {
    Router.push({
      pathname: '/orders/detail',
      query: {
        type: 'apply',
        id,
      },
    });
  };

  if (loading) {
    return <Loader />;
  }
  if (!dataSource.length) {
    return <Empty />;
  }
  return (
    <ul className={styles.listView}>
      {dataSource.map((item: any) => {
        return <Card hidePaytype hideDoctor textOver key={item.id} data={item} onClick={onClick} />;
      })}
    </ul>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(ApplyListView);
