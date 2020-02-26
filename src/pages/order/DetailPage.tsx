import React,{ReactNode} from 'react';
import { PACKAGE_CONTENT } from "@/pages/order/config";
import {Tabs,Button} from "antd-mobile";

import styles from './DetailPage.less'

interface TAB {title: string|ReactNode}
const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '设备介绍'},
  {title: '设备规格'},
];

interface INDEX_HANDLER{
  ():void
}

interface DETAIL_PAGE_PROPS {
  detailData: PACKAGE_CONTENT,
  indexHandler: INDEX_HANDLER
}

export default function DetailPage(props: DETAIL_PAGE_PROPS) {
  const { detailData, indexHandler } = props;
  const { packageDetail } = detailData;
  console.log(detailData);
  return (
    <div className={styles['detail-page']}>
      <div className={styles['img-block']}>
        <div className={styles['text-block']}>
        </div>
      </div>
      <Tabs tabs={tabs}>
        <div className={styles['tab-item']}>
          {packageDetail.map((v,index) => (
            <div className={styles['detail-item']} key={index}>
              <div className={styles['item-name']}>
                {v.serviceName}
              </div>
              <div className={styles['remark']}>
                {v.remark}
              </div>
              <div className={styles['count']}>
                {v.count}
              </div>
            </div>
          ))}
        </div>
        <div className={styles['tab-item']}>
          富文本
        </div>
        <div className={styles['tab-item']}>
          UI还没出
        </div>
      </Tabs>
      <div className={styles['footer']}>
        <div className={styles['price']}>
          <h1>￥{detailData.price}</h1>
        </div>
        <div className={styles['buy']}>
          <Button className={styles['button']} onClick={indexHandler}>
            <span  style={{color: '#ffffff', textShadow: '#91959A', width: '128px', textAlign: 'center', lineHeight: 'auto'}}>
              购买
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
