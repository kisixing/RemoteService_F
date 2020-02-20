import React, {ReactNode} from 'react';
import {PACKAGE_LIST_ITEM} from "@/pages/order/config";
import styles from "@/pages/order/PackageList.less";

interface CARD_PROPS {
  data: PACKAGE_LIST_ITEM,
  children?: ReactNode
}

function PackageCard(props:CARD_PROPS) {
  const { name, price, picUrl, host, marking } = props.data;
  const { children } = props;
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={picUrl} alt=""/>
      </div>
      <div className={styles.right}>
        <div className={styles.first}>
          <div className={styles.name}>{name}</div>
          <div className={styles.marking}>{marking}</div>
        </div>
        <div className={styles.second}>
          <div className={styles.host}>{host}</div>
        </div>
        <div className={styles.third}>
          <div className={styles.price}>￥{price}</div>
          <div className={styles.childrenDOM}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DETAIL_HANDLER{
  (key: string):void
}
interface PACKAGE_LIST_PROPS {
  listData: Array<PACKAGE_LIST_ITEM>,
  detailHandler: DETAIL_HANDLER
}

export default function PackageList(props: PACKAGE_LIST_PROPS) {
  const { listData, detailHandler } = props;
  return (
    <div className={styles['package-list']}>
      {listData.map(v => (
        <div className={styles['item-content']} key={v.key}>
          <PackageCard data={v}>
            <span onClick={() => {detailHandler(v.key)}}>查看详情 <b>></b></span>
          </PackageCard>
        </div>
      ))}
    </div>
  )
}

