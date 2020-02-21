/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-21 21:12:26
 * @Description: 视频列表
 */

import React from 'react';

import styles from './Video.less'

export default function Video() {
  return (
    <div className={styles.list}>
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      .map(i => <div key={i} className={styles.item}>{`Video-${i}`}</div>)}
    </div>
  )
}
