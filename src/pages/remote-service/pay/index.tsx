// 支付页面
import React,{useState } from 'react';
import { connect } from 'dva';
import { Button, Checkbox, WingBlank } from 'antd-mobile';
import BackButton from '@/components/BackButton';
import { wxpay } from '@/services/pay';
import { ConnectState } from '@/models/connect';

import { PackageListItem } from '@/pages/remote-service/package/interface';
import { GlobalModelState } from '@/models/global';

var wx =  require('weixin-js-sdk');

import styles from './index.less';

interface PayProp{
  currentPackageId:number,
  packageList: Array<PackageListItem>,
  currentPregnancy:GlobalModelState
}

// props中获取订单信息 | 路由获取
function Pay(props:PayProp) {

  // 传入订单header - 订单确认/订单续租
  console.log(props);
  const [payType, setPayType] = useState('');

  const [isAgree, setIsAgree] = useState(false);

  const onSelect = (type: string):void => {
    setPayType(type);
  }

  const handleAgree = ():void => {
    if(isAgree){setPayType('');}
    setIsAgree(isAgree => !isAgree);
  }

  // TODO 支付fn
  const pay = () => {
    const sessionData = window.sessionStorage['persist:redux-storage'];
    const sessionObj = JSON.parse(sessionData);
    const PREGNANCY_ID = JSON.parse(sessionObj['global'])['currentPregnancy']['id'];
    // const {confirmData} = props
    const PACKAGE_ID = props.currentPackageId;
    console.log(props);
    wxpay({servicepackage: {id: PACKAGE_ID}, pregnancy: {id: PREGNANCY_ID}}).then(payorder => {
      wx.config({
        appId: payorder.appId,
        timestamp: payorder.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payorder.nonceStr, // 支付签名随机串，不长于 32 位
        jsApiList: ['chooseWXPay']
      });
      // wx.checkJsApi({
      //   jsApiList: ['chooseWXPay'],
      //   success: function (res:any) {
      //     // 微信内置浏览器接口 - 判别微信支付信息
      // @ts-ignore
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest", {
          appId: payorder.appId,
          timestamp: payorder.timeStamp,
          nonceStr: payorder.nonceStr,
          package: payorder.packageValue,
          signType: payorder.signType,
          paySign: payorder.paySign
        },
        function (res:any) {
          if(res.err_msg === 'get_brand_wcpay_request:cancel' || res.err_msg === 'get_brand_wcpay_request:fail') {
            alert('支付失败，请重新支付');
          }else if(res.err_msg === '调用支付JSAPI缺少参数：total_fee') {
            alert('请检查下单接口')
          }else if(res.err_msg === 'get_brand_wcpay_request:ok') {
            alert('支付成功,跳转');
          }
        }
      )
      //   },
      //   error: function(err:any) {
      //     alert('不可以');
      //     console.log(err);
      //   }
      // });
      wx.chooseWXPay({
        timestamp: payorder.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payorder.nonceStr, // 支付签名随机串，不长于 32 位
        package: payorder.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: payorder.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payorder.paySign, // 支付签名
        success: function (res:any) {
          // 支付成功后的回调函数
          alert(res);
          // router.push({ pathname: '/purchase/result'});
        }
      });
    })
  }

  const currentPackageData = props.packageList.find(v => v.id === props.currentPackageId);

  console.log(currentPackageData);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>复旦大学附属妇产科医院门诊</div>
        <div>周一至周五:08:00 - 09:00 上午</div>
        <div><span>周一至周五:</span>08:00 - 09:00 下午</div>
      </div>
      <div className={styles.content}>
        <WingBlank>
          {currentPackageData ? (
            <div className={styles.packageInfo}>
              <div>
                <div><span>套餐名称</span></div>
                <div><span>{currentPackageData.name}</span></div>
              </div>
              <div>
                <div><span>套餐价格</span></div>
                <div><span>￥{currentPackageData.price}</span></div>
              </div>
              <div>
                <div><span>套餐有效期</span></div>
                <div><span>{currentPackageData.validdate}天</span></div>
              </div>
              <div>
                <div><span>套餐判图可用次数</span></div>
                <div><span>{currentPackageData.service1amount}次</span></div>
              </div>
              <div>
                <div><span>套餐咨询可用次数</span></div>
                <div><span>{currentPackageData.service2amount}次</span></div>
              </div>
            </div>
          ):(
            <div>无套餐信息请刷新或重新进入</div>
          )}
        </WingBlank>
      </div>
      <div className={styles.footer}>

        <div className={styles.agree}>
          <Checkbox checked={isAgree} onChange={handleAgree}>我同意<a href="#">《购买协议》</a></Checkbox>
        </div>
        <div className={styles.pay}>
          <div className={styles.choice}>
          <div className={styles['choice-item']} onClick={() => onSelect('wx')}>
            <div className={styles.text}>
              <img src={require('@/assets/icons/wxpay.png')} alt=""/>
              &nbsp;
              <span>微信支付</span>
            </div>
            <div className={styles.checkbox}>
              <Checkbox checked={payType === "wx"} disabled={!isAgree} />
            </div>
          </div>
          <div className={styles['choice-item']} onClick={() => onSelect('ali')}>
            <div className={styles.text}>
            <img src={require('@/assets/icons/alipay.png')} alt=""/>
              &nbsp;
              <span>支付宝支付</span>
            </div>
            <div className={styles.checkbox}>
              <Checkbox checked={payType === "ali"} disabled={!isAgree} />
            </div>
          </div>
        </div>
        </div>
        <div className={styles.btn}>
          <Button disabled={payType === "" || !isAgree} onClick={pay}>
            支付
          </Button>
        </div>
      </div>
      <BackButton/>
    </div>
  )
}

export default connect(({combo, global}: ConnectState) => ({
  currentPackageId: combo.currentPackageId,
  packageList:combo.packageList,
  currentPregnancy: global.currentPregnancy
}))(Pay);
