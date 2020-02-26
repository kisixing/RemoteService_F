import React from 'react';
import { PACKAGE_CONTENT, PACKAGE_DETAIL_OBJ } from "@/pages/order/config";
import { Button, Radio } from 'antd-mobile';
import styles from '@/pages/order/PackageConfirm.less';

interface PACKAGE_CONFIRM_PROP {
  confirmData: PACKAGE_CONTENT
}

const RadioItem = Radio.RadioItem;

export default function PackageConfirm(props: PACKAGE_CONFIRM_PROP) {
  const { confirmData } = props;
  console.log(confirmData);

  const renderList = (list: Array<PACKAGE_DETAIL_OBJ>) => list.map((item:PACKAGE_DETAIL_OBJ, index ) => (
    <div key={index}>
      <div>{item.serviceName}</div>
      <div>{item.remark}</div>
      <div>{item.count}</div>
    </div>
  ));
  return (
    <div className={styles['package-confirm']}>
      <div className={styles['header']}>
        <div>复旦大学附属妇产科医院门诊</div>
        <div>周一至周五:08:00 - 09:00 上午</div>
        <div><span>周一至周五:</span>08:00 - 09:00 下午</div>
      </div>
      <div className={styles['list']}>
        <div>物品清单</div>
        <div className={styles['list-header']}>a</div>
        <div>
          {renderList(confirmData.packageDetail)}
        </div>
      </div>
      <div className={styles['footer']}>
        <div><span>支付页面</span></div>
        <div className={styles['choice-block']}>
          <RadioItem>微信支付</RadioItem>
          <RadioItem>支付宝支付</RadioItem>
        </div>
        <div className={styles['btn']}>
          <Button>
            <span>支付</span>
          </Button>
        </div>
      </div>

    </div>
  );
}
