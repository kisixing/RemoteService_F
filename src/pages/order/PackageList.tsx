import React, {ReactNode} from 'react';
import { PackageListItem } from './interface';
import styles from "@/pages/order/PackageList.less";

interface CARD_PROPS {
  data: PackageListItem,
  children?: ReactNode
}

function PackageCard(props:CARD_PROPS) {
  const { name, price } = props.data;
  const { children } = props;
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={require('@/assets/order/packagepic2.png')} alt=""/>
      </div>
      <div className={styles.right}>
        <div className={styles.first}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.marking}>
            单胎
          </div>
        </div>
        <div className={styles.second}>
          <div className={styles.price}>￥{price}</div>
          <div className={styles.childrenDOM}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface INDEX_HANDLER{
  (key: number):void
}
interface PACKAGE_LIST_PROPS {
  listData: Array<PackageListItem>,
  indexHandler: INDEX_HANDLER
}

export default function PackageList(props: PACKAGE_LIST_PROPS) {
  const { listData, indexHandler } = props;
  return (
    <div className={styles['package-list']}>
      {listData.map(v => (
        <div className={styles['item-content']} key={v.id}>
          <PackageCard data={v}>
            <span onClick={() => {indexHandler(v.id)}}>查看详情 <b>></b></span>
          </PackageCard>
        </div>
      ))}
    </div>
  )
}

