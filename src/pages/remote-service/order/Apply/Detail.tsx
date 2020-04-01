import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'umi/router';
import { Toast } from 'antd-mobile';
import { IconFont, Button } from '@/components/antd-mobile';
import { getServiceOrder } from '@/services/remote-service';
import { ORDER_STATE } from '../Monitor/ListView';
import Card from './Card';

import styles from '../Monitor/Detail.less';

export default function ApplyDetail({ id }: any) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getServiceOrder(id).then((res: any) => {
      if (res && res.id) {
        setData(res);
      }
    });
  }, []);

  const gotoService = () => {
    Toast.info('服务未开通...', 1);
    // Router.push({
    //   pathname: `/consultation/chat/${'联系客服'}`,
    // });
  };

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <IconFont type="date" />
        {data.state ? <span>{ORDER_STATE[data.state]}</span> : <span>暂无订单状态</span>}
      </div>
      <div className={styles.main}>
        <Card data={data} />
      </div>
      <Button className={styles.service} onClick={gotoService}>
        <IconFont type="serve" />
        <span>联系客服</span>
      </Button>
    </div>
  );
}
