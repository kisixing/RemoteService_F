/*
 * @Description: 在线问诊医生列表页面
 * @Author: Zhong Jun
 * @Date: 2020-03-04 15:51:24
 */

import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

import { Picker, WingBlank, SearchBar } from 'antd-mobile';
import { IconFont, Tag } from '@/components/antd-mobile';
import DoctorItem from './Item';
import { router } from '@/utils';
import styles from './List.less';

const HOSPITALS = ['复旦大学附属妇产科医院', '暨南大学附属第一医院', '中山大学附属第一医院'].map(e => ({ label: e, value: e }));
const d = [
  {
    id: '8787',
    name: '李医生',
    position: '主治医师', // , '副主任医师', '主任医师', '住院医师'],
    answerRate: '90%',
    favorableRate: '98%',
    inquiries: '90%',
    content: '擅长高危终端',
    thumbnail: '',
    time: '2019-09',
    price: 0.01,
    replytime: '2',
  },
  {
    id: '879987',
    name: '田医生',
    position: '副主任医师', // , '副主任医师', '主任医师', '住院医师'],
    answerRate: '90%',
    favorableRate: '98%',
    inquiries: '90%',
    content: '擅长疑难杂症',
    thumbnail: '',
    time: '2019-12',
    price: 0.01,
    replytime: '1',
  }
]

const CustomChildren = (props: any) => (
  <div onClick={props.onClick} style={{ paddingLeft: 15 }}>
    {props.children}
  </div>
);

function DoctorList({ dispatch, doctors }: any) {
  const [hospital, setHospital] = useState('复旦大学附属妇产科医院');
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    // dispatch({ type: 'consultation/getDoctors' });
    setDoctor(d)
  }, []);

  // 医院设置
  const onOk = (e: any) => setHospital(e);

  const onClick = (id: string) => {
    router(`/consultation/doctor/${id}`);
  };

  const onSearch = () => {};

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
        <SearchBar focused={false} placeholder="搜索医生" maxLength={8} onSubmit={onSearch} />
      </div>
      <WingBlank className={styles.content}>
        <div className={styles.header}>
          <Tag data-seed="logId" size="middle" color="#F5897C">
            解答快
          </Tag>
          <div className={styles.title}>
            快速咨询{' '}
            <IconFont
              type="jiantou-right-circle-xian"
              size="0.36rem"
              style={{ marginLeft: '10px' }}
            />
          </div>
          <div className={styles.subTitle}>快速匹配医生，第一时间解答</div>
        </div>
        <div style={{ lineHeight: 1, marginBottom: '0.3rem', color: '#25265e' }}>在线医生</div>
        {doctor &&
          doctor.length > 0 &&
            doctor.map((e: any) => (
              <DoctorItem
                key={e.id}
                id={e.id}
                name={e.name}
                thumbnail={e.thumbnail}
                price={e.price}
                position={e.position}
                content={e.content}
                replytime={e.replytime}
                answerRate={e.answerRate}
                favorableRate={e.favorableRate}
                inquiries={e.inquiries}
                onClick={onClick}
              />
            ))}
      </WingBlank>
    </div>
  );
}

export default connect(({ loading, consultation }: ConnectState) => ({
  loading: loading,
  doctors: consultation.doctors,
}))(DoctorList);
