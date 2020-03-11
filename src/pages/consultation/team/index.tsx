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

import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { IconFont, Tag, BackButton, Button } from '@/components/antd-mobile';
import CommentItem from '../doctors/CommentItem';
import styles from '../doctors/Detail.less';
import headerStyle from './index.less';

function TeamDetail({ dispatch, comments, match, ...rest }: any) {
  useEffect(() => {
    const id = match.params.id;
    dispatch({
      type: 'consultation/getComments',
      payload: {
        teamId: id,
      },
    });
  }, []);

  return (
    <div className="page">
      <div className={headerStyle.card}>
        <div className={headerStyle.name}>{'复旦大学附属妇产科医师团队'}</div>
        <div className={headerStyle.bottom}>
          快速匹配本院在线医生
          <br />
          无需长时间等待
        </div>
        <div className={headerStyle.icon} />
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
        {comments.length > 0 &&
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
      <div className={styles.bottom}>
        <div className={styles.price}>
          ￥<span>{'30'}</span>
          元/次
        </div>
        <Button type="primary" inline>
          图文支持
        </Button>
      </div>
      <BackButton />
    </div>
  );
}

export default connect(({ loading, consultation }: ConnectState) => ({
  loading: loading,
  comments: consultation.comments,
}))(TeamDetail);

