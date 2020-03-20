/*
 * @Description: 咨询订单选择支付方式页面，注意微信环境下和H5 webapp下的支付方式
 * @Author: Zhong Jun
 * @Date: 2020-03-20 14:49:19
 */

import React, { useState } from 'react';
import { WingBlank, Radio, List } from 'antd-mobile';
import { IconFont, BackButton, Button } from '@/components/antd-mobile';

import styles from './PaymentPage.less';

const RadioItem = Radio.RadioItem;

function PaymentPage() {
  const [payment, setPayment] = useState();

  const onChange = (e: any) => {
    const { name } = e.target;
    setPayment(name);
  };

  return (
    <div className="page">
      <div className={styles.main}>
        <div className={styles.NO}>
          <IconFont type="icon_article_line" size="0.4rem" />
          <span>订单号：</span>
        </div>
        <div className={styles.content}>服务内容：图文咨询</div>
        <div className={styles.sum}>
          <IconFont type="fl-renminbi" size="0.4rem" />
          <span>30</span>
        </div>
      </div>
      <List
        className={styles.payment}
        renderHeader={() => <span style={{ fontSize: '0.24rem' }}>支付方式</span>}
      >
        <RadioItem id="wechat" name="wechat" checked={payment === 'wechat'} onChange={onChange}>
          <div className={styles.label}>
            <img alt="wechat" src={require('../../../assets/icons/wechat-pay-fill.svg')} />
            微信
          </div>
        </RadioItem>
        <RadioItem id="alipay" name="alipay" checked={payment === 'alipay'} onChange={onChange}>
          <div className={styles.label}>
            <img alt="alipay" src={require('../../../assets/icons/alipay-fill.svg')} />
            支付宝
          </div>
        </RadioItem>
      </List>
      <div className="bottom_button">
        <Button type="primary" disabled={!payment}>
          确认支付
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default PaymentPage
