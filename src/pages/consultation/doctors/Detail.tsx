/*
 * @Description: 医生详情介绍页面
 * @Author: Zhong Jun
 * @Date: 2020-03-10 17:37:13
 */

import React, { useEffect } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { Modal, Toast } from 'antd-mobile';
import { ConnectState } from '@/models/connect';
import { IconFont, Tag, Button } from '@/components/antd-mobile';
import CommentItem from './CommentItem';
import styles from './Detail.less';

function DoctorDetail({ dispatch, comments, match, currentPregnancy }: any) {
  useEffect(() => {
    const doctorId = match.params.id;
    dispatch({
      type: 'consultation/getComments',
      payload: {
        doctorId: doctorId,
      },
    });
  }, []);

  const onClick = () => {
    if (currentPregnancy && !currentPregnancy.id) {
      return Modal.alert('温馨提示', '本院仅支持建档且已审核的孕妇线上咨询，是否开始建档？', [
        { text: '取消', onPress: () => {} },
        { text: '确定', onPress: () => Router.push('/perinatal/basic-info') },
      ]);
    }

    return Router.push({
      pathname: '/consultation/consulting-details',
      query: {
        doctorId: '123',
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span className={styles.name}>医生姓名</span>
              <Tag size="middle">主任医师</Tag>
            </div>
            <div className={styles.extra}>
              <span>解答率{'98%'}</span>
              <span>好评率{'99%'}</span>
              <span>咨询量{'78'}</span>
              {/* <span>平均回复{'3小时内'}</span> */}
            </div>
          </div>
          <div className={styles.hospital}>复旦大学附属妇产科医院</div>

          <div className={styles.skilled}>
            擅长：妊娠高血压疾病和妊娠期糖尿病、双胎、羊水栓塞的处理子宫脱垂、慢性盆腔疼痛等盆底功能障碍性疾病的综慢性盆腔疼痛等盆底功
            能障碍性疾病的综慢性盆腔疼痛等盆底功能障碍性疾病的综慢性盆腔疼痛等盆底功能障碍性疾病的综...
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
            <div className={styles.title}>患者评价 (12)</div>
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
          ￥<span>{'0.01'}</span>
          元/次
        </div>
        <Button inline type="primary" onClick={onClick}>
          图文咨询
        </Button>
      </div>
    </div>
  );
}

export default connect(({ loading, consultation, global }: ConnectState) => ({
  loading: loading,
  comments: consultation.comments,
  currentPregnancy: global.currentPregnancy,
}))(DoctorDetail);
