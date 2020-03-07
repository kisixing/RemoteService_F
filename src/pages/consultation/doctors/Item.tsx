/*
 * @Description: 列表 item快
 * @Author: Zhong Jun
 * @Date: 2020-03-04 18:05:56
 */

import React from 'react';
import numeral from 'numeral';
import { IconFont, Tag, Touchable } from '@/components/antd-mobile';
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
  rates = [9.99, 3000, 1999.89, 9999.99, 10000.01][Math.floor(Math.random()*10+1)],
  thumbnail = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583327368326&di=60a200c85377ff11784662f35c943975&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F77%2F54%2F5a3b76f5c1457_610.jpg'
}: IProps) {
  return (
    <Touchable
      activeStopPropagation
      activeStyle={{ background: 'rgba(0, 0, 0, 0.02)' }}
      delayPressIn={60}
      delayPressOut={60}
      // onPress={onPress}
      // onLongPress={onLongPress}
    >
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <img src={thumbnail} />
        </div>
        <div className={styles.content}>
          <div className={styles.name}>
            {name}
            <Tag size="middle" bgcolor="#ddd" style={{ marginLeft: '0.64rem' }}>
              {position}
            </Tag>
          </div>
          <div className={styles.extra}>
            <span>解答率 {'98%'}</span>
            <span>好评率 {'99%'}</span>
            <span>咨询量 {'37'}</span>
          </div>
          <div className={styles.speciality}>擅长：</div>
          <div className={styles.extra}>
            平均回复 : <span>12小时内</span>
          </div>
          <div className={styles.rates}>
            <IconFont type="fl-renminbi" size="0.36rem" />
            <span>{numeral(rates).format('0,0.00')}</span>
          </div>
        </div>
      </div>
    </Touchable>
  );
}
