import React,{ReactNode} from 'react';
import { PACKAGE_CONTENT } from "@/pages/order/config";
import {Tabs} from "antd-mobile";

import styles from './DetailPage.less'

interface TAB {title: string|ReactNode}
const tabs:Array<TAB> = [
  {title: '套餐详情'},
  {title: '胎监介绍'},
  {title: '设备规格'},
]
interface DETAIL_PAGE_PROPS {
  detailData: PACKAGE_CONTENT
}

export default function DetailPage(props: DETAIL_PAGE_PROPS) {
  const { detailData } = props;
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
          {packageDetail.map(v => (
            <div className={styles['detail-item']}>
              {v.serviceName} {v.count} {v.remark}
            </div>
          ))}
        </div>
        <div className={styles['tab-item']}>
          s
        </div>
        <div className={styles['tab-item']}>
          t
        </div>
      </Tabs>
    </div>
  )
}
