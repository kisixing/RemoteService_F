import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Tag, IconFont, WhiteSpace } from '@/components/antd-mobile';
import { getServiceRrders } from '@/services/remote-service';
import { ConnectState } from '@/models/connect';

import styles from '../Monitor/ListView.less';

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
    <ul className={styles.listView}>
      {dataSource &&
        dataSource.length > 0 &&
        dataSource.map((item: any) => {
          return (
            <li key={item.id} className={styles.item} onClick={() => onClick(item)}>
              <div className={styles.header}>
                <div className={styles.title}>
                  <IconFont type="order" size="0.36rem" />
                  <span className={styles.name}>{item.servicepackage && item.servicepackage.name}</span>
                  <span>{item.prenatalvisit && moment(item.prenatalvisit.visitTime).format('YYYY-MM-DD')}</span>
                </div>
                <div className={styles.div}>
                  订单号：<span className={styles.time}>{item.sn}</span>
                </div>
                <div className={styles.div}>
                  结&emsp;果：
                  <span className={styles.time}>{!!item.result ? item.result : '待回复'}</span>
                </div>
              </div>
              <div className={styles.content}>
                <div>
                  <IconFont type="refund" size="0.36rem" />
                  <span style={{ fontSize: '0.32rem', color: '#150f55' }}>{item.payment}</span>
                  <span style={{ marginLeft: '.32rem', fontSize: '0.2rem', color: '#5c6187' }}>
                    (含押金￥ {item.cashPledge || 1099})
                  </span>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default connect(({ global }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
}))(ApplyListView);
