import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Tag, IconFont } from '@/components/antd-mobile';
import { ORDER_STATE, payType } from '../Monitor/ListView';
import styles from '../Monitor/Card.less';

function Card({ data, onClick, hidePaytype, hideDoctor, textOver }: any) {
  // 判图类型 CTGAPPLY 为普通胎监判图， CTGREALTIME 实时CTG  ， CTGSP 专家判图
  const typeName = (type: string) => {
    let typeName = '未定义胎监判图';
    if (type === 'CTGAPPLY') {
      typeName = '普通胎监判图';
    }
    if (type === 'CTGREALTIME') {
      typeName = '实时CTG';
    }
    if (type === 'CTGSP') {
      typeName = '专家判图';
    }
    return typeName;
  };

  const diagnosis = data.diagnosis ? JSON.parse(data.diagnosis) : {};
  const prenatalvisit = data.prenatalvisit ? data.prenatalvisit : {};

  return (
    <li key={data.id} className={styles.item} onClick={() => onClick(data.id)}>
      <div className={styles.header}>
        <div className={styles.title}>
          <IconFont type="order" size="0.36rem" />
          <span className={styles.name}>{typeName(data.type)}</span>
          <span className={styles.right}>
            {data.prenatalvisit &&
              moment(data.prenatalvisit.visitTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div className={styles.div}>
          <span className={styles.label}>订&ensp;单&ensp;号：</span>
          <span className={styles.time}>{data.sn}</span>
        </div>
        {!hidePaytype ? (
          <div className={styles.div}>
            <span className={styles.label}>支付方式：</span>
            <span>{payType(data.paytype)}</span>
          </div>
        ) : null}
        {!hideDoctor ? (
          <div className={styles.div}>
            <span className={styles.label}>判图医生：</span>
            <span>{data.user && data.user.firstName}</span>
          </div>
        ) : null}
        <div className={styles.div}>
          <span className={styles.label}>结&emsp;&emsp;果：</span>
          <span className={styles.result}>
            {diagnosis.NST === '有反应'
              ? 'NST正常'
              : diagnosis.NST === '无反应'
              ? 'NST异常'
              : diagnosis.NST === '可疑'
              ? 'NST可疑'
              : diagnosis.NST === '不满意'
              ? 'NST无法判读'
              : ''}
          </span>
        </div>
        <div className={classnames([styles.div], { [styles.textOver]: !!textOver })}>
          <span className={styles.label}>意&emsp;&emsp;见：</span>
          <span className={styles.time}>{diagnosis.diagnosistxt || '待回复'}</span>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.content} style={{ paddingTop: 0 }}>
        <div>
          <IconFont type="refund" size="0.36rem" />
          <span style={{ fontSize: '0.32rem', color: '#150f55' }}>
            {data.payment === 'package' ? '套餐扣除' : data.payment}
          </span>
          <span style={{ marginLeft: '.32rem', fontSize: '0.2rem', color: '#5c6187' }}>
            {/* (含押金￥ {data.cashPledge || 1099}) */}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
