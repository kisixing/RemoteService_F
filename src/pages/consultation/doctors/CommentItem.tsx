/*
 * @Description: 患者评论item
 * @Author: Zhong Jun
 * @Date: 2020-03-11 14:12:10
 */

import React from 'react';
import { Rate } from 'antd';
import pic from '../../../assets/icons/boy.png';
import styles from './CommentItem.less';

interface IProps {
  name?: string
  thumbnail?: string
  comment?: string
  time?: string
  rate?: number
};
export default function CommentItem({
  name = 'user name',
  thumbnail,
  comment = '擅长：妊娠高血压疾病和妊娠期糖尿病、双胎、羊水栓塞的处理子宫脱垂、慢性盆腔疼痛等盆疾病和妊娠期糖尿病、双胎、羊水栓塞的处理子宫脱垂、慢性盆腔疼痛等盆疾病和妊娠期糖尿病、双胎、羊水栓塞的处理子宫脱垂、慢性盆腔疼痛等盆底功能障碍性疾病的综... ',
  time = '2020-10-10 12:00',
  rate = 4.5,
}: IProps) {
  return (
    <div className={styles.item}>
      <div className={styles.thumbnail}>
        <img alt={name} src={thumbnail || pic} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <Rate allowHalf value={rate} />
        </div>
        <div className={styles.comment}>{comment}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  );
}
