/*
 * @Author: ZhongJun
 * @Date: 2020-07-11 16:13:51
 * @Descriptions: 支付宝支付操作页面
 */

import React from 'react';
import { Button, WhiteSpace, Modal } from 'antd-mobile';
import Router from 'umi/router';
import { isWeixin, getPageQuery } from '@/utils';
import { alipay } from '@/services/pay';
import styles from './alipay.less';

export default function Alipay() {
  const isWeixn = isWeixin();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!isWeixn) {
      // 非微信环境下直接支付操作
      pay();
    }
  }, []);

  const pay = async () => {
    const query = getPageQuery();
    const { pregnancyId, packageId, access_token } = query;

    // Toast.info('暂时不支持支付宝！！！');
    const response = await alipay(
      {
        servicepackage: { id: packageId },
        pregnancy: { id: pregnancyId },
      },
      { Authorization: `Bearer ${access_token}` },
    );
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

  return (
    <div className={styles.wrap}>
      <div className={styles.pic}>
        <span className={styles.text}>请点击这里进行支付操作</span>
      </div>
      <div className={styles.tip}>
        {'操作步骤：请点击微信右上角图标 --> 在浏览器打开 --> 进行支付宝支付'}
      </div>
      <div className={styles.btn}>
        <Button type="primary" onClick={() => setVisible(true)}>
          支付
        </Button>
        <WhiteSpace size="lg" />
        <Button type="ghost" onClick={() => Router.push('/orders')}>
          返回
        </Button>
      </div>
      <Modal
        transparent
        maskClosable
        visible={visible}
        onClose={() => setVisible(false)}
        className={styles.mask}
      >
        <div className={styles.text}>请点击这里进行支付操作</div>
      </Modal>
    </div>
  );
}
