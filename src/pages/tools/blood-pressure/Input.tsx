/*
 * @Description: 血压输入
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:30:21
 */

import React, { useState } from 'react';
import { InputItem, List, Toast } from 'antd-mobile';
import { notification } from 'antd';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import { router } from '@/utils/utils';
import DatePicker from '../components/DatePicker';
import { setBloodPressures } from '@/services/tools';

import styles from './Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 30);
const maxDate = new Date(nowTimeStamp);

function BloodPressureInput(props: {userid: number}) {
  const [date, setDate] = useState(now)
  // const [bloodPressure, setBloodPressure] = useState();
  const [diastolic, setDiastolic] = useState('')
  const [systolic, setSystolic] = useState('')
  const [heartRate, setHeartRate] = useState('');

  const onSubmit = () => {
    const d = moment(date);
    if (!diastolic || !systolic) {
      return Toast.info('请输入血压数值...');
    }
    // if (!heartRate) {
    //   return Toast.info('请输入心率数值...');
    // }
    setBloodPressures({
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      timestamp: d,
      pregnancy: {id: props.userid}
    }).then((r:any) => {
      console.log(r);
      if(r.response.status >= 200 && r.response.status < 300){
        notification.success({message: '数据保存成功'});
      } 
    });
  }
  return (
    <div className={styles.container}>
      <DatePicker
        mode="datetime"
        title="选择日期"
        extra="请选择日期"
        // minDate={minDate}
        // maxDate={maxDate}
        value={date}
        onChange={date => setDate(date)}
      />
      <WhiteSpace />
      <div className={styles.content}>
        <div className={styles.text} onClick={() => router('/signs/blood-pressure/record')}>
          <IconFont type="record" size="28px" />
          <span>历史记录</span>
        </div>
        <div className={styles.circle}>
          <span>血压</span>
          <div className={styles.input}>
            <input
              type="number"
              placeholder="舒张压"
              value={diastolic}
              onChange={e => setDiastolic(e.target.value)}
              style={{ width: '1.2rem' }}
            />
            /
            <input
              type="number"
              placeholder="收缩压"
              value={systolic}
              onChange={e => setSystolic(e.target.value)}
              style={{ width: '1.2rem' }}
            />
            <IconFont type="editor-line" size="0.36rem" />
          </div>
          <span className={styles.unit}>mmHg</span>
        </div>
        <List className={styles.formList}>
          <InputItem
            clear
            type="digit"
            labelNumber={7}
            placeholder="请输入心率"
            value={heartRate}
            onChange={v => setHeartRate(v)}
          >
            <div className={styles.label}>
              {/* <span className={styles.required}>*</span> */}
              心率
              <span className={styles.unit}>(次/分)</span>
            </div>
          </InputItem>
        </List>
      </div>
      <div className={styles.bottom}>
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
        <BackButton />
      </div>
    </div>
  );
}

export default BloodPressureInput;
