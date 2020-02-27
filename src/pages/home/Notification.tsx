/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-11 23:33:19
 * @Description: 消息提示
 */

import * as React from 'react';
import { IconFont } from '@/components/antd-mobile';
import styles from './Notification.less';

interface IProps {}
export default (props: IProps) => {
  const {} = props
  return (
    <div className={styles.notification}>
      <div className={styles.left}>
        <IconFont type="voice22" /> 提醒
      </div>
      <div className={styles.right}>
        <marquee>有您的消息...</marquee>
      </div>
    </div>
  )
}
