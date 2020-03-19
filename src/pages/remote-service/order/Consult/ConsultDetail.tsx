/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-04 22:46:20
 * @Description: 我的订单详情
 */

import React,{ReactNode} from 'react';
import BackButton from '@/components/BackButton';
import { Button } from 'antd-mobile';
import { ServiceOrderItem } from '@/pages/remote-service/order/interface';

import styles from '../Detail.less';

interface ConsultDetailProp{
  data: ServiceOrderItem
}

function ConsultDetail(props: ConsultDetailProp) {


  const renderHeader = (state:string):ReactNode => {
    console.log(state);
    switch (state) {
      case '1':
        return (
          <div className={styles.state}>
            <div><span>咨询结束</span></div>
            <div><Button>再次咨询</Button><img src={require('@/assets/icons/icon_next@2x.png')} alt=""/></div>
          </div>
        )
      case '2':
        return (
          <div className={styles.state}>
            <div><span>待接诊</span></div>
            <div><strong>></strong></div>
          </div>
        )
      case '3':
        return(
          <div className={styles.state}>
            <div><span>设备待领取</span></div>
          </div>
        )
      case '4':
        return <div className={styles.state}>
          <div><span>等待支付</span><small style={{color: 'red'}}>剩余时间：14:30</small></div>
          <div><Button>去支付</Button></div>
        </div>
      default:
        return (
          <div className={styles.state}>
            <span>状态未知</span>
          </div>
        )
    }
  }


  return (
    <div className={styles.container}>
        {/* {renderHeader(state)} */}
        <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <img src={require('@/assets/icons/bar-code@3x.png')}/>
            <span><b>订单号：78798898</b></span>
          </div>
          <div>
            <img src={require('@/assets/icons/price@3x.png')}/>
            <span><b>50</b></span>
          </div>
        </div>
        <hr/>
        <div className={styles.content}>
          <span>订单类型：</span><span><b>图文咨询</b></span>
          <div><span>咨询医生:</span></div>
          <div className={styles.doctor}>
            <div><img src={require('@/assets/order/doctor.png')} alt=""/></div>
            <div>
              <div><span>王奕声</span><span>副主任医师</span></div>
              <div><span>复旦大学附属妇产科医院</span></div>
            </div>
          </div>
          <div><span>咨询内容</span></div>
          <div><span>擅长：妊娠高血压疾病和妊娠期糖尿病、双胎、羊水栓塞的处理子宫脱垂、慢性盆腔疼痛等盆底功能障碍性疾病的综... </span></div>
        </div>
      </div>
      <br/>
      <BackButton/>
    </div>
  )
}

export default ConsultDetail;
