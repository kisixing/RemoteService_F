/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:29:02
 * @Description: 医疗团队
 */

/*
 * @Description: 医生详情介绍页面
 * @Author: Zhong Jun
 * @Date: 2020-03-10 17:37:13
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { IconFont, Tag, Button } from '@/components/antd-mobile';
import CommentItem from '../doctors/CommentItem';
import styles from '../doctors/Detail.less';
import headerStyle from './index.less';

const p1 = require('@/assets/images/consultation_4.png');
const p2 = require('@/assets/images/consultation_1.png');
const p3 = require('@/assets/images/consultation_2.png');
const p4 = require('@/assets/images/consultation_3.png');

function TeamDetail({ dispatch, comments, match, location, ...rest }: any) {
  const { icon, color } = location.query;
  const [image, setImage] = useState(p1)
  useEffect(() => {
    // 获取团队id
    const id = match.params.id;
    const index = id === 'quick' ? p1 : id === 'diabetes' ? p2 : id === 'hypertensive' ? p3 : p4;
    setImage(index);

    dispatch({
      type: 'consultation/getComments',
      payload: {
        teamId: id,
      },
    });
  }, []);
  // backgroundImage: `url(${constant.aliyuncs}/icons/${item.icon}@3x.png)`,
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={headerStyle.card} style={{ backgroundImage: `url(${image})` }}>
          <div className={headerStyle.mask}>
            <h1 className={headerStyle.name}>{'复旦大学附属妇产科医师团队'}</h1>
            <div className={headerStyle.text}>
              快速匹配本院在线医生
              <br />
              无需长时间等待
            </div>
            <div className={headerStyle.icon}>
              <div className={headerStyle.icon_inner}>
                <IconFont type={icon} size="0.78rem" color={color} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>图文咨询</div>
          <div className={styles.tags}>
            <Tag bgcolor="#ebedf0" color="#535881">
              <IconFont type="visit" size="0.3rem" />
              &nbsp;保证医生真实
            </Tag>
            <Tag bgcolor="#ebedf0" color="#535881">
              <IconFont type="refund" size="0.3rem" />
              &nbsp;超时自动退费
            </Tag>
          </div>
          <ul className={styles.tips}>
            <li>医生开始解答后24小时内可不限次数交流</li>
            <li>医生24小时未回复，自动退款</li>
          </ul>
        </div>
        <div className={styles.comment}>
          <div className={styles.header}>
            <div className={styles.title}>患者评价 12</div>
            <div className={styles.extra}>
              查看全部
              <IconFont type="dropdown" size="0.36rem" />
            </div>
          </div>
          {comments &&
            comments.length > 0 &&
            comments.map((e: any) => (
              <CommentItem
                key={e.id}
                name={e.name}
                thumbnail={e.thumbnail}
                comment={e.comment}
                time={e.time}
                rate={e.rate}
              />
            ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.price}>
          ￥<span>{'30'}</span>
          元/次
        </div>
        <Button type="primary" inline>
          图文支持
        </Button>
      </div>
    </div>
  );
}

export default connect(({ loading, consultation }: ConnectState) => ({
  loading: loading,
  comments: consultation.comments,
}))(TeamDetail);

