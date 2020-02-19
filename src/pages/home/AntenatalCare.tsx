/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-14 22:33:32
 * @Description: 产检提醒
 */

import * as React from 'react';

import styles from './AntenatalCare.less';

interface IProps {
  gestationalWeek?: string
}
export default (props: IProps) => {
  // TODO 增加个性化产检规则提醒
  const { gestationalWeek } = props;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <div className={styles.title}>第8次产检将到</div>
          <div className={styles.subTitle}>时间：2018-11-20   周一</div>
        </div>
        <div className={styles.img} />
      </div>
    </div>
  )
}
