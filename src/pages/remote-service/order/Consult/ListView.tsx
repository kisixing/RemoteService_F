import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { getServiceRrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';
import { Loader, Empty } from '../Monitor/ListView';
import Card from './Card';

import styles from '../Monitor/ListView.less';

function ConsultListView({ currentPregnancy }: any) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getServiceRrders({
      'pregnancyId.equals': currentPregnancy.id,
    }).then((res: any) => {
      if (res && res.length) {
        setDataSource([]);
        setLoading(false);
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
