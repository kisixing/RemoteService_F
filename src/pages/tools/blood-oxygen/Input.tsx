/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 17:12:21
 * @Description: 血氧
 */

import React,{useEffect} from 'react';
import { InputItem, List, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import Router from 'umi/router'
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import { router } from '@/utils/utils';
import DatePicker from '../components/DatePicker';
import { setBloodOxygens, editBloodOxygens } from '@/services/tools';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

function BloodOxygenInput(props: {userid: number}) {
  const [date, setDate] = React.useState(now);
  const [bloodOxygen, setBloodOxygen] = React.useState('');
  const [pulseRate, setPulseRate] = React.useState('');

  // 用于控制新建于修改
  const [id,setId] = React.useState(-1);
  const onSubmit = () => {
    const d = moment(date);
    if (!bloodOxygen) {
      return Toast.info('请输入血氧数值...');
    }
    if (!pulseRate) {
      return Toast.info('请输入脉率数值...');
    }
    const reqData ={
      result: Number(bloodOxygen),
      timestamp: d,
      pregnancy: {id: props.userid},
      pulserate: Number(pulseRate),
      status: 0
    }
    if(id !== -1){
      editBloodOxygens({...reqData,id: id}).then(res => {
        if(res.response.status >= 200 && res.response.status < 300 ){
          Toast.success('血氧数据修改成功');
          Router.push('/signs/record?type=blood-oxygen');
        }
      })
    }else{
      setBloodOxygens(reqData).then((r:any) => {
        if(r.response.status >= 200 && r.response.status < 300 ){
          Toast.success('血氧数据保存成功');
          Router.push('/signs/record?type=blood-oxygen');
        }
      });
    }
  };

  useEffect(() => {
    if(window.location.search){
      let obj = {};
      window.location.search.split('?')[1].split('&').forEach((v:string) => {
        obj[v.split('=')[0]] = v.split('=')[1];
      });    
      console.log(obj);
      if(obj['timestamp']){
        setId(Number(obj['id']));
        setBloodOxygen(obj['result']);
        setPulseRate(obj['pulserate']==="null" ? null : obj['pulserate']);
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
        value={date}
        onChange={date => setDate(date)}
      />
      <WhiteSpace />
      <div className={styles.content}>
        <div className={styles.text} onClick={() => router('/signs/blood-oxygen/record')}>
          <IconFont type="record" size="28px" />
          <span>历史记录</span>
        </div>
        <div className={styles.circle}>
          <span>血氧饱和度</span>
          <div className={styles.input}>
            <input
              type="number"
              placeholder="输入..."
              value={bloodOxygen}
              onChange={e => setBloodOxygen(e.target.value)}
            />
            <IconFont type="editor-line" size="0.36rem" />
          </div>
          <span className={styles.unit}>%</span>
        </div>
        <List className={styles.formList}>
          <InputItem
            type="digit"
            labelNumber={7}
            placeholder="请输入脉率"
            clear
            value={pulseRate}
            onChange={v => setPulseRate(v)}
          >
            <div className={styles.label}>
              <span className={styles.required}>*</span>
              脉率
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
  userid:global.currentPregnancy?.id
}))(BloodOxygenInput);
