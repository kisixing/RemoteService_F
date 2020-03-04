/*
 * @Description: 列表 item快
 * @Author: Zhong Jun
 * @Date: 2020-03-04 18:05:56
 */

import React from 'react';
import { IconFont, Tag } from '@/components/antd-mobile';
import styles from './Item.less';

interface IProps {
  name?: string
  rates?: number | string
  thumbnail?: string
  position?: string
}

export default function DoctorItem({
  name = '扁鹊',
  position = '主治医师',
  rates = 10000,
  thumbnail = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583327368326&di=60a200c85377ff11784662f35c943975&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F77%2F54%2F5a3b76f5c1457_610.jpg'
}: IProps) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          {name}
          <Tag style={{ marginLeft: '1rem' }}>{position}</Tag>
        </div>
        <div className={styles.extra}>
          <span>解答率</span>
          <span>好评率</span>
          <span>咨询量</span>
        </div>
        <div className={styles.speciality}>擅长：</div>
        <div className={styles.extra}></div>
        <div className={styles.rates}>
          <IconFont type="iconback" />
          <span>￥{rates}</span>
        </div>
      </div>
    </div>
  );
}
