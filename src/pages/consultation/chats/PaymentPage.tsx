/*
 * @Description: 咨询订单选择支付方式页面，注意微信环境下和H5 webapp下的支付方式
 * @Author: Zhong Jun
 * @Date: 2020-03-20 14:49:19
 */

import React, { useState, useEffect } from 'react';
import Router from 'umi/router';
import { Radio, List, Toast } from 'antd-mobile';
import { IconFont, Button } from '@/components/antd-mobile';
import { isWeixin, getPageKeyValue } from '@/utils';

import styles from './PaymentPage.less';

const RadioItem = Radio.RadioItem;

function PaymentPage() {
  const isWeixn = isWeixin();
  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (isWeixn) {
      setPayment('wechat');
    }
  }, [])

  const onChange = (e: any) => {
    const { name } = e.target;
    setPayment(name);
  };

  const onSubmit = () => {
    const IMId = getPageKeyValue('IMId');
    if (payment === 'alipay') {
      return Toast.info('暂不支持支付宝，请使用微信支付...');
    }
    Router.push(`/consultation/chat/${IMId}`);
  };

  return (
    <div className="page">
      <div className={styles.header}>
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
      <div className={styles.details}>
        <p>订单详情</p>
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
        {isWeixn ? null : (
          <RadioItem id="alipay" name="alipay" checked={payment === 'alipay'} onChange={onChange}>
            <div className={styles.label}>
              <img alt="alipay" src={require('../../../assets/icons/alipay-fill.svg')} />
              支付宝
            </div>
          </RadioItem>
        )}
      </List>
      <div className="bottom_button">
        <Button type="primary" disabled={!payment} onClick={onSubmit}>
          确认支付
        </Button>
      </div>
    </div>
  );
}

export default PaymentPage
