import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { getServiceOrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';
import { Loader, Empty } from '../Monitor/ListView';
import Card from './Card';

import styles from '../Monitor/ListView.less';

function ConsultListView({ currentPregnancy }: any) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getServiceOrders({
      'pregnancyId.equals': currentPregnancy.id,
    }).then((res: any) => {
      setLoading(false);
      if (res && res.length) {
        setDataSource([]);
      }
    });
  }, []);

  const onClick = (value: object) => {};

  if (loading) {
    return <Loader />;
  }
  if (!dataSource.length) {
    return <Empty />;
  }
  return (
    <ul className={styles.listView}>
      {dataSource.map((item: any) => {
        return <Card key={item.id} data={item} onClick={onClick} />;
      })}
    </ul>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(ConsultListView);
