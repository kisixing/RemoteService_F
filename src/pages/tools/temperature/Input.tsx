/*
 * @Description: 血压输入
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:30:21
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Toast } from 'antd-mobile';
import Router from 'umi/router';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import { router } from '@/utils/utils';
import DatePicker from '../components/DatePicker';
import { setTemperatures, editTemperatures } from '@/services/tools';
import { Range } from '@/pages/tools/signs/config';

import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const { NORMAL_MAX } = Range.temperature;

function TemperatureInput(props: {userid: number}) {
  const [date, setDate] = useState(now);
  const [temperature, setTemperature] = useState('')

  const [id,setId] = React.useState(-1);

  const onSubmit = () => {
    const d = moment(date);
    if (!temperature) {
      return Toast.info('请输入体温数值...');
    }
    const reqData = {
      result: Number(temperature),
      timestamp: d,
      pregnancy: {id: props.userid},
      status: 0
    };
    if(id !== -1) {
      editTemperatures({...reqData,id:id}).then(res => {
        if(res.response.status >= 200 && res.response.status < 300){
          Toast.success('体温数据修改成功');
          setTimeout(() => {
            Router.push('/signs/record?type=temperature');
          },500)
        }
      })
    }else {
      setTemperatures(reqData).then(r => {
        if(r.response.status >= 200 && r.response.status < 300){
          Toast.success('体温数据保存成功');
          setTimeout(() => {
            Router.push('/signs/record?type=temperature');
          },500)
        }
      })
    }
  };

  useEffect(() => {
    if(window.location.search){
      let obj = {};
      window.location.search.split('?')[1].split('&').forEach((v:string) => {
        obj[v.split('=')[0]] = v.split('=')[1];
      });    
      if(obj['timestamp']){
        setId(Number(obj['id']));
        setTemperature(obj['result'])
        setDate(new Date(obj['timestamp']));
      }
    }
  },[]);

  const inputStyle = () => {
    if(Number(temperature) > NORMAL_MAX){
      return {color: 'red'};
    }
    return {};
  }

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
        <div className={styles.text} onClick={() => router('/signs/temperature/record')}>
          <IconFont type="record" size="28px" />
          <span>历史记录</span>
        </div>
        <div className={styles.circle}>
          <span>体温</span>
          <div className={styles.input}>
            <input
              type="number"
              placeholder="输入..."
              value={temperature}
              style={inputStyle()}
              onChange={e => setTemperature(e.target.value)}
            />
            <IconFont type="editor-line" size="0.36rem" />
          </div>
          <span className={styles.unit}>℃</span>
        </div>
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
}))(TemperatureInput);
