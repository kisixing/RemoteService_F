/*
 * @Description: 套餐支付页面
 * @Author: Zhong Jun
 * @Date: 2020-03-21 16:52:51
 */

import React, { useState, useEffect } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { WingBlank, Radio, List, Checkbox, Toast, Modal } from 'antd-mobile';
import wx from 'weixin-js-sdk';
import { IconFont, Button } from '@/components/antd-mobile';
import Card from '../order/Monitor/Card';
import { wechatPay } from '@/services/remote-service';
import { alipay } from '@/services/pay';
import { isWeixin, getPageQuery } from '@/utils';
import { ConnectState } from '@/models/connect';
import styles from './PackagePay.less';

const RadioItem = Radio.RadioItem;

function PackagePay(props: any) {
  const isWeixn = isWeixin();
  const [payment, setPayment] = useState('');
  const [agree, setAgree] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isWeixn) {
      setPayment('wechat');
    }
  }, []);

  const onChange = (e: any) => {
    const { name } = e.target;
    setPayment(name);
  };

  const onAgreement = (e: any) => {
    e.preventDefault();
    setVisible(true);
  };

  const onSubmit = () => {
    // const query = getPageQuery();
    const {
      location: { query },
      token,
    } = props;
    const { pregnancyId, packageId } = query;
    if (!pregnancyId || !packageId) {
      return Toast.info('请携带套餐信息...');
    }
    if (payment === 'wechat') {
      return wxPay(packageId, pregnancyId);
    }
    if (payment === 'alipay') {
      // return aliPay(packageId, pregnancyId);
      return Router.push({
        pathname: '/alipay',
        query: {
          packageId,
          pregnancyId,
          access_token: token,
        },
      });
    }
  };

  const wxPay = async (packageId: string | number, pregnancyId: string | number) => {
    const response = await wechatPay({
      servicepackage: { id: packageId },
      pregnancy: { id: pregnancyId },
    });
    console.log('支付返回数据', response);
    if (response && response.appId) {
      wx.config({
        appId: response.appId,
        timestamp: response.timeStamp,
        nonceStr: response.nonceStr,
        jsApiList: ['chooseWXPay'],
      });
      wx.chooseWXPay({
        timestamp: response.timeStamp,
        nonceStr: response.nonceStr,
        package: response.packageValue,
        signType: response.signType,
        paySign: response.paySign,
        success: function(res: any) {
          // 支付成功后的回调函数
          if (res.errMsg === 'chooseWXPay:ok') {
            Router.push('/orders');
          } else if (res.errMsg === 'chooseWXPay:fail') {
            Toast.info('支付失败');
          }
        },
        fail: function(res: any) {
          Toast.fail('支付失败');
        },
        complete: function(res: any) {
          if (res.errMsg == 'chooseWXPay:cancel') {
            Toast.info('支付取消');
          }
        },
      });
    } else {
      Modal.alert('提示', '支付异常，如有需要请联系商家。', [
        { text: '确定', onPress: () => console.log('cancel'), style: 'default' },
      ]);
    }
  };

  const aliPay = async (packageId: string | number, pregnancyId: string | number) => {
    // Toast.info('暂时不支持支付宝！！！');
    const response = await alipay({
      servicepackage: { id: packageId },
      pregnancy: { id: pregnancyId },
    });
    if (response) {
      const div = document.createElement('div');
      div.innerHTML = response;
      document.body.appendChild(div);
      document.forms[0].submit();
    } else {
      Modal.alert('提示', '支付异常，如有需要请联系商家。', [
        { text: '确定', onPress: () => console.log('cancel'), style: 'default' },
      ]);
    }
  };

  const goAlipay = () => {
    const {
      location: { query },
      token,
    } = props;
    const { pregnancyId, packageId } = query;

    if (isWeixn) {
      Router.push({
        pathname: '/alipay',
        query: {
          packageId,
          pregnancyId,
          access_token: token,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>设备领取时间地点</p>
        <div className={styles.hospital}>
          <IconFont type="hospital" size="0.4rem" />
          <span>{props.hospital}门诊4楼508胎监室</span>
        </div>
        <div className={styles.time}>
          <IconFont type="time2" size="0.4rem" />
          <span>周一至周五：</span>
          <div className={styles.interval}>
            <div>08:00 - 09:00 上午</div>
            <div>16:00 - 17:00 下午</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <p>订单详情</p>
        <Card hideOverPrint={true} data={props.currentPackage} />
      </div>
      <List
        className={styles.payment}
        renderHeader={() => <span style={{ fontSize: '0.24rem' }}>支付方式</span>}
      >
        {isWeixn ? (
          <RadioItem id="wechat" name="wechat" checked={payment === 'wechat'} onChange={onChange}>
            <div className={styles.label}>
              <img alt="wechat" src={require('../../../assets/icons/wechat-pay-fill.svg')} />
              微信
            </div>
          </RadioItem>
        ) : null}
        {/* {isWeixn ? null : (
          <RadioItem id="alipay" name="alipay" checked={payment === 'alipay'} onChange={onChange}>
            <div className={styles.label}>
              <img alt="alipay" src={require('../../../assets/icons/alipay-fill.svg')} />
              支付宝
            </div>
          </RadioItem>
        )} */}
        <RadioItem
          id="alipay"
          name="alipay"
          checked={payment === 'alipay'}
          onChange={onChange}
          onClick={goAlipay}
        >
          <div className={styles.label}>
            <img alt="alipay" src={require('../../../assets/icons/alipay-fill.svg')} />
            支付宝
          </div>
        </RadioItem>
      </List>
      <WingBlank className={styles.agreeItem}>
        <Modal
          closable
          transparent
          visible={visible}
          maskClosable={false}
          onClose={() => setVisible(false)}
          className={styles.modal}
        >
          <iframe
            width="100%"
            src={process.env.NODE_ENV === 'development' ? '/useragree.html' : '/H5/useragree.html'}
          />
        </Modal>
        <Checkbox checked={agree} onChange={(e: any) => setAgree(e.target.checked)}>
          <span style={{ marginLeft: '0.08rem' }}>我同意</span>
        </Checkbox>
        <a onClick={onAgreement}>《购买协议》</a>
      </WingBlank>
      <div className="bottom_button">
        <Button type="primary" disabled={!payment || !agree} onClick={onSubmit}>
          确认支付
        </Button>
      </div>
    </div>
  );
}

export default connect(({ global, remoteService }: ConnectState) => ({
  token: global.access_token,
  currentPackage: remoteService.currentPackage,
  hospital: global.hospital,
}))(PackagePay);
