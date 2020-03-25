/*
 * @Description: 血压输入
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:30:21
 */

import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import { connect } from 'dva';
import { InputItem, List, Toast } from 'antd-mobile';
import Router from 'umi/router';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import { router } from '@/utils/utils';
import DatePicker from '../components/DatePicker';
import { setBloodPressures, editBloodPressures } from '@/services/tools';
import { ConnectState } from '@/models/connect';
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
  
  const [id,setId] = React.useState(-1);
  const diastolicInput:MutableRefObject<any> = useRef(null),systolicInput:MutableRefObject<any> = useRef(null)

  const onSubmit = () => {
    const d = moment(date);
    if (!diastolic || !systolic) {
      return Toast.info('请输入血压数值...');
    }
    if (!heartRate) {
      return Toast.info('请输入心率数值...');
    }
    const reqData = {
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      timestamp: d,
      pregnancy: {id: props.userid},
      pulserate: Number(heartRate),
      status:0,
    };
    if(id !== -1){
      editBloodPressures({...reqData,id: id}).then(res => {
        if(res.response.status >= 200 && res.response.status < 300){
          Toast.success('血压数据修改成功');
          setTimeout(() => {
            Router.push('/signs/record?type=blood-pressure');
          },500);
        }
      })
    }else{
      setBloodPressures(reqData).then((res) => {
        if(res.response.status >= 200 && res.response.status < 300){
          Toast.success('血压数据保存成功');
          setTimeout(() => {
            Router.push('/signs/record?type=blood-pressure');
          },500);
        } 
      });
    }
  }

  // 处理输入 根据首位字母自动定位到对应的输入框
  const handleInput = (type:string,val:string):void => {
    if(type === 'diastolic'){
      if(val.length === 1 && /1|2/.test(val)){
        setSystolic(val);
        systolicInput.current.focus();
      }else{
        setDiastolic(val);
      }
    }else if(type === 'systolic'){
      if(val.length === 1 && !(/1|2/.test(val))){
        setDiastolic(val);
        diastolicInput.current.focus();
      }else{
        setSystolic(val);
      }
    }
  }

  useEffect(() => {
    let obj = {};
    console.log(window.location.search);
    if(window.location.search){
       window.location.search.split('?')[1].split('&').forEach((v:string) => {
      obj[v.split('=')[0]] = v.split('=')[1];
    });    
      if(obj['timestamp']){
        setId(Number(obj['id']));
        setDiastolic(obj['diastolic']);
        setSystolic(obj['systolic']);
        setHeartRate(obj['pulserate']);
        setDate(new Date(obj['timestamp']));
      }
    }
   
  },[]);

  return (
    <div className={styles.container}>
      <DatePicker
        mode="datetime"
        title="选择日期"
        extra="请选择日期"
        minDate={minDate}
        maxDate={maxDate}
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
              placeholder="收缩压"
              value={systolic}
              onChange={e => handleInput('systolic',e.target.value)}
              style={{ width: '1.2rem' }}
              ref={systolicInput}
            />
            /
            <input
              type="number"
              placeholder="舒张压"
              value={diastolic}
              onChange={e => handleInput('diastolic',e.target.value)}
              style={{ width: '1.2rem' }}
              ref={diastolicInput}
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
              <span className={styles.required}>*</span>
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

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(BloodPressureInput);
