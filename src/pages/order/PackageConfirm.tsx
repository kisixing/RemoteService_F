import React from 'react';

import { Dispatch } from "redux";
import { connect } from 'dva';

import { PackageListItem } from './interface';
// 模拟 先完成支付
import { PACKAGE_CONTENT, PACKAGE_DETAIL_OBJ, packageContent } from "@/pages/order/config";
import { Button } from 'antd-mobile';

import { wxpay } from "@/services/pay";
import styles from '@/pages/order/PackageConfirm.less';
interface PACKAGE_CONFIRM_PROP {
  confirmData: PackageListItem;
  dispatch: Dispatch;
}

// const RadioItem = Radio.RadioItem;
console.log(window.sessionStorage['persist:redux-storage']);
function PackageConfirm(props: PACKAGE_CONFIRM_PROP) {
  const confirmData: PACKAGE_CONTENT = packageContent[0];



  // const { dispatch } = props;
  console.log(props);
  // @ts-ignore
  const renderList = (list: Array<PACKAGE_DETAIL_OBJ>) => list.map((item:PACKAGE_DETAIL_OBJ, index ) => (
    <div key={index}>
      <div>{item.serviceName}</div>
      <div>{item.remark}</div>
      <div>{item.count}</div>
    </div>
  ));

  // 暂时先现在这个位置
  function pay() {
    const sessionData = window.sessionStorage['persist:redux-storage'];
    const sessionObj = JSON.parse(sessionData);
    const PREGNANCY_ID = JSON.parse(sessionObj['global'])['currentPregnancy']['id'];
    
    const {confirmData} = props;
    wxpay({servicepackage: {id: confirmData.id}, pregnancy: {id: PREGNANCY_ID}}).then(payorder => {
      var wx = window.wx;
      wx.config({
        appId: payorder.appId,
        timestamp: payorder.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payorder.nonceStr, // 支付签名随机串，不长于 32 位
        jsApiList: ['chooseWXPay']
      });
      wx.chooseWXPay({
        timestamp: payorder.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payorder.nonceStr, // 支付签名随机串，不长于 32 位
        package: payorder.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: payorder.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payorder.paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          console.log(res);
          // router.push({ pathname: '/purchase/result'});
        }
      });
    })
  };

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
        {/*<div className={styles['choice-block']}>*/}
        {/*  <RadioItem>微信支付</RadioItem>*/}
        {/*  <RadioItem>支付宝支付</RadioItem>*/}
        {/*</div>*/}
        <div className={styles['btn']}>
          <Button onClick={pay}>
            <span>微信支付</span>
          </Button>
        </div>
      </div>

    </div>
  );
}

export default connect(({global}) => {
  console.log(global);
  return {}
})(PackageConfirm);
