import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'umi/router';
import { IconFont, Button } from '@/components/antd-mobile';
import { getServiceOrder } from '@/services/remote-service';
import { ORDER_STATE, payType } from '../Monitor/ListView';
import Card from './Card';

import styles from '../Monitor/Detail.less';

export default function ApplyDetail({ id }: any){
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getServiceOrder(id).then((res: any) => {
      if (res && res.id) {
        setData(res);
      }
    });
  }, []);

  const gotoService = () => {
    Router.push({
      pathname: `/consultation/chat/${'联系客服'}`,
    });
  };

  const prenatalvisit = data.prenatalvisit ? data.prenatalvisit : {};
  const diagnosis = data.diagnosis ? JSON.parse(data.diagnosis) : {};
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <IconFont type="date" />
        {data.state ? <span>{ORDER_STATE[data.state]}</span> : <span>暂无订单状态</span>}
      </div>
      <div className={styles.main}>
        <Card data={data} />
      </div>
      <div className={styles.footer}>
        <div className={styles.content}>
          <p>订单消息</p>
          <div className={styles.details}>
            <div>
              <IconFont type="orderwait" size="0.36rem" />
              <span className={styles.orderNO}>订&thinsp;单&thinsp;号：{data.sn}</span>
            </div>
            <div>
              监测时间：{prenatalvisit.visitTime && moment(prenatalvisit.visitTime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div>支付方式：{payType(data.paytype)}</div>
            <div>判图医生：{diagnosis.wave}</div>
            <div>结&emsp;&emsp;果：{diagnosis.diagnosistxt ? diagnosis.diagnosistxt : '待回复'}</div>
          </div>
          {/* <Button className={styles.service} onClick={gotoService}>
            <IconFont type="serve" />
            <span>联系客服</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
