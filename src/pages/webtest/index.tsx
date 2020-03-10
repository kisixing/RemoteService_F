import React from 'react';
import Router from 'umi/router';
import { webpay } from '../../services/pay';

// "prenatalvisit": {"id": 8223},
	// "pregnancy": {"id": 4210} 

// '/webtest?prenatalvisit='

export default function WebTest() {
  if(window.location.href.indexOf("?") === -1) {
    const sessionData = window.sessionStorage['persist:redux-storage'];
    const sessionObj = JSON.parse(sessionData);
    const PREGNANCY_ID = JSON.parse(sessionObj['global'])['currentPregnancy']['id'];
    Router.push(`/webtest?pregnancy=${PREGNANCY_ID}&prenatalvisit=8223`);
  }else {
    const data = window.location.href.split('?')[1];
    const dataArr = data.split('&');
    let reqData = {};
    dataArr.forEach((v:any) => {
      let obj = {};
      const key = v.split('=')[0];
      const val = v.split('=')[1];
      obj[key] = {id: val};
      Object.assign(reqData, obj);
    })
    webpay(reqData).then((res:any) => {
      const { mwebUrl } = res;
      window.location.href = mwebUrl;
      // 开始轮询 检查用户是否已经支付
    })
  }
  return (
    <div>a</div>
  )
}
