import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'umi/router';
import { Toast }from 'antd-mobile';
import { IconFont, Button } from '@/components/antd-mobile';
import { getPackageOrder } from '@/services/remote-service';
import { ORDER_STATE, payType } from './ListView';
import Card from './Card';
import styles from './Detail.less';

interface IProps {
  id: string | number
}

export default function MonitorDetail({ id }: IProps) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getPackageOrder(id).then((res: any) => {
      if (res && res.id) {
        setData(res);
      }
    });
  }, [])

  const gotoService = () => {
    Toast.info('服务未开通...', 1)
    // Router.push({
    //   pathname: `/consultation/chat/${'联系客服'}`,
    // });
  }

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <IconFont type="date" />
        {data.state ? <span>{ORDER_STATE[data.state]}</span> : <span>暂无订单状态</span>}
      </div>
      <div className={styles.main}>
        <Card hideOverPrint data={data} />
      </div>
      <div className={styles.footer}>
        <div className={styles.content}>
          <p>订单消息</p>
          <div className={styles.details}>
            <div>
              <IconFont type="orderwait" size="0.36rem" />
              <span className={styles.orderNO}>订&thinsp;单&thinsp;号：{data.sn}</span>
            </div>
            <div>订单时间：{data.createtime && moment(data.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>支付方式：{payType(data.paytype)}</div>
          </div>
          <Button className={styles.service} onClick={gotoService}>
            <IconFont type="serve" />
            <span>联系客服</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
