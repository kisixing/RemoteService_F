/*
 * @Description: 在线问诊医生列表页面
 * @Author: Zhong Jun
 * @Date: 2020-03-04 15:51:24
 */

import React, { useState } from 'react';

import { Picker, WingBlank, SearchBar } from 'antd-mobile';
import { IconFont, Tag } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import DoctorItem from './Item';
import styles from './index.less';

const HOSPITALS = ['复旦大学附属妇产科医院', '暨南大学附属第一医院', '中山大学附属第一医院'].map(e => ({ label: e, value: e }));

const CustomChildren = (props: any) => (
  <div onClick={props.onClick} style={{ paddingLeft: 15 }}>
    {props.children}
  </div>
);

function DoctorList() {
  const [hospital, setHospital] = useState('复旦大学附属妇产科医院');

  const onOk = (e: any) => setHospital(e);

  return (
    <div className="page">
      <div className={styles.header}>
        <div className={styles.hospital}>
          <div className={styles.name}>
            <IconFont type="hospital" style={{ marginRight: '10px' }} />
            {hospital}
          </div>
          <div className={styles.arrow}>
            <Picker title="选择医院" extra="请选择(可选)" cols={1} data={HOSPITALS} onOk={onOk}>
              <CustomChildren>更换医院</CustomChildren>
            </Picker>
          </div>
        </div>
        <SearchBar placeholder="搜索医生" maxLength={8} />
      </div>
      <WingBlank className={styles.content}>
        <div className={styles.header}>
          <Tag data-seed="logId">解答快</Tag>
          <div className={styles.title}>
            快速咨询 <IconFont type="jiantou-right-circle-xian" style={{ marginLeft: '10px' }} />
          </div>
          <div className={styles.subTitle}>快速匹配医生，第一时间解答</div>
        </div>
        <div style={{ marginBottom: '0.3rem', color: '#25265e' }}>在线医生</div>
        <DoctorItem />
        <DoctorItem />
        <DoctorItem />
        <DoctorItem />
        <DoctorItem />
        <DoctorItem />
      </WingBlank>
      <BackButton />
    </div>
  );
}

export default DoctorList;
