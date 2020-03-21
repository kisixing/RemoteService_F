/*
 * @Description: 列表 item快
 * @Author: Zhong Jun
 * @Date: 2020-03-04 18:05:56
 */

import React from 'react';
import numeral from 'numeral';
import { IconFont, Tag } from '@/components/antd-mobile';
import styles from './Item.less';

interface IProps {
  id: string
  name?: string
  price?: number | string
  thumbnail?: string
  content?: string
  replytime?: number
  position?: string
  inquiries?: string
  favorableRate?: string
  answerRate?: string
  onClick?: (key: string) => void
}

export default function DoctorItem({
  id,
  onClick = () => {},
  name,
  position,
  price,
  thumbnail,
  content,
  replytime,
  inquiries,
  favorableRate,
  answerRate
}: IProps) {
  return (
    <div className={styles.card} onClick={() => onClick(id)}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          {name}
          <Tag size="middle" bgcolor="#ddd" color="#383f4a" style={{ marginLeft: '0.42rem' }}>
            {position}
          </Tag>
        </div>
        <div className={styles.extra}>
          <span>解答率 {answerRate}</span>
          <span>好评率 {favorableRate}</span>
          <span>咨询量 {inquiries}</span>
        </div>
        <div className={styles.speciality}>擅长：{content}</div>
        <div className={styles.extra}>
          平均回复: <span>{replytime}小时内</span>
        </div>
        <div className={styles.rates}>
          <IconFont type="fl-renminbi" size="0.3rem" />
          <span>{numeral(price).format('0,0.00')}</span>
        </div>
      </div>
    </div>
  );
}
