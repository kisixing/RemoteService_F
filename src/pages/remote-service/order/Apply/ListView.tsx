import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Tag, IconFont, WhiteSpace } from '@/components/antd-mobile';
import { getServiceRrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';

import styles from './ListView.less';

function ApplyListView({ currentPregnancy }: any) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getServiceRrders({
      'pregnancyId.equals': currentPregnancy.id,
    }).then((res: any) => {
      if (res && res.length) {
        setDataSource(res);
      }
    });
  }, []);

  const onClick = (value: object) => {};

  return (
    <div className={styles.listView}>
      {dataSource &&
        dataSource.length > 0 &&
        dataSource.map((item: any) => {
          return (
            <div key={item.id} className={styles.item}>
              <div onClick={() => onClick(item)}>
                <div style={{ height: '1.2rem' }}>22222222222222222222222222</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(ApplyListView);
