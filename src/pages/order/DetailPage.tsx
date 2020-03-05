import React,{ReactNode} from 'react';
import { CurrentPackageDetail } from './interface';

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
  detailData: CurrentPackageDetail,
  indexHandler: INDEX_HANDLER
}

export default function DetailPage(props: DETAIL_PAGE_PROPS) {
  const { detailData, indexHandler } = props;
  // const { packageDetail } = detailData;
  // console.log(detailData);
  console.log(props);
  return (
    <div className={styles['detail-page']}>
      <div className={styles['img-block']}>
        <div className={styles['text-block']}>
        </div>
      </div>
      <Tabs tabs={tabs}>
        {/*<div className={styles['tab-item']} dangerouslySetInnerHTML={{__html: detailData.introduction}} />*/}
        <div className={styles['tab-item']} >
          <span>当前套餐id：{detailData.id}</span>
        </div>
        <div className={styles['tab-item']} dangerouslySetInnerHTML={{__html: detailData.specification}} />
        <div className={styles['tab-item']} dangerouslySetInnerHTML={{__html: detailData.note}} />
      </Tabs>
      <div className={styles['footer']}>
        <div className={styles['price']}>
          <h1>￥5000</h1>
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
