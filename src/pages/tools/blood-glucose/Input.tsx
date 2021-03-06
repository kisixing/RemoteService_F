/*
 * @Description: 血糖
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:29:38
 */

 // TODO 血压这里的period有问题
import React, { useState, useEffect } from 'react';
import { Tabs, List, InputItem, TextareaItem, Toast, Checkbox } from 'antd-mobile';
import { connect } from 'dva';
import Router from 'umi/router';
import moment from 'moment';
import { Button, IconFont } from '@/components/antd-mobile';
import DatePicker from '../components/DatePicker';
import { router } from '@/utils';
import { PERIOD_CODE } from './config';
import { ConnectState } from '@/models/connect'
import { setBloodGlucose, editBloodGlucose, getBloodGlucose, getRecordNum, GetProp } from '@/services/tools';
import { Range } from "@/pages/tools/signs/config";
import CircleProgress from '../components/CricleProgress';

import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const tabs:Array<any> = [
  { title: '早餐前', key: PERIOD_CODE.FASTING },
  { title: '早餐后', key: PERIOD_CODE.AFTER_B },
  { title: '午餐前', key: PERIOD_CODE.BEFORE_L },
  { title: '午餐后', key: PERIOD_CODE.AFTER_L },
  { title: '晚餐前', key: PERIOD_CODE.BEFORE_D },
  { title: '晚餐后', key: PERIOD_CODE.AFTER_D },
  { title: '睡前', key: PERIOD_CODE.BEFORE_S },
];

// 数据结构
// isEdited 用于对于判断是否为服务器返回的数据
const json:Array<any> = [
  { key: PERIOD_CODE.FASTING, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.AFTER_B , bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.BEFORE_L, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.AFTER_L, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.BEFORE_D, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.AFTER_D, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 },
  { key: PERIOD_CODE.BEFORE_S, bloodGlucose: '', isInsulin: null, quantity: '', dietaryStatus: '', exercise: '', isEdited: false, id: -1 }
];

const fontSize = document.getElementsByTagName('html')[0].style.fontSize;
const { EMPTY_MIN, EMPTY_MAX, EATING_MIN, EATING_MAX } = Range.bloodGlucose;

function BloodGlucoseInput(props: {userid: number}) {
  // TODO 根据tab key获取提交的值
  const [date, setDate] = useState(now);
  const [activatedTab, setActivatedTab] = useState(PERIOD_CODE.FASTING);
  const [values, setValues] = useState(json);
  const [current, setCurrent] = useState({
    bloodGlucose: '',
    isInsulin: null,
    quantity: undefined,
    dietaryStatus: '',
    exercise: '',
    key: 0
  });


  useEffect(() => {
    let obj = {};
    // 从修改页面过来的
    if(window.location.search){
      window.location.search.split('?')[1].split('&').forEach((v:string) => {
        obj[v.split('=')[0]] = v.split('=')[1];
      });
      if(obj['timestamp']){
        const tar = {
          bloodGlucose: obj['result'],
          isInsulin: Boolean(obj['insulin']),
          quantity: obj['insulinnote'] === "null" ? "" : obj['insulinnote'],
          key: Number(obj['period']),
          dietaryStatus: obj['diet'] === "null" ? "" : decodeURI(obj['diet']),
          exercise: obj['exercise'] === "null" ? "" : decodeURI(obj['exercise'])
        };
        setValues((values:any) => {
          const i = values.findIndex((v:any) => v.key === Number(obj['period']));
          let newValues = JSON.parse(JSON.stringify(values));
          newValues.splice(i,1,tar);
          return newValues;
        });
        // setId(Number(obj['id']));
        setActivatedTab(Number(obj['period']));
        setDate(new Date(obj['timestamp']));
      }else{
        // 并非从修改页面过来，需要请求当前的数据
        // 判读当前tabs定位
        console.log(now);
        const h = now.getHours();
        let p = 0;
        if(h >= 3 && h < 8){
          p = PERIOD_CODE.FASTING;
        }else if(h >= 8 && h < 10){
          p = PERIOD_CODE.AFTER_B;
        }else if(h >= 10 && h < 12){
          p = PERIOD_CODE.BEFORE_L;
        }else if(h >= 12 && h < 15){
          p = PERIOD_CODE.AFTER_L;
        }else if(h >= 15 && h < 18){
          p = PERIOD_CODE.BEFORE_D;
        }else if(h >= 18 && h < 21){
          p = PERIOD_CODE.AFTER_D;
        }else{
          p = PERIOD_CODE.BEFORE_S;
        }
        console.log(p)
        setActivatedTab(p);
      }
    }
  },[])

  useEffect(() => {
    const index = values.findIndex(e => e.key === activatedTab);
    setCurrent(values[index]);
    return () => {};
  }, [activatedTab,values]);

  useEffect(() => {
    getRecordNum({ type: 'blood-glucoses', pregnancyId: props.userid }).then(res => {
      if (res.data !== 0) {
        const reqData: GetProp = { pregnancyId: props.userid, page: 0, size: Number(res.data), sort: 'timestamp' };
        getBloodGlucose(reqData).then(res => {
          // 之后再抽离
          const { data } = res;
          console.log(data);
          const formatDate = moment(now).format('YYYY-MM-DD');
          const tarData = data.filter((v: {timestamp: string}) => v.timestamp.slice(0,10) === formatDate );
          let newValues = JSON.parse(JSON.stringify(values));
          console.log(tarData);
          tarData.forEach((v: any) => {
            newValues[v.period].bloodGlucose = v.result;
            newValues[v.period].isInsulin = v.insulin;
            newValues[v.period].quantity = Number(v.insulinnote);
            newValues[v.period].exercise = v.exercise;
            newValues[v.period].dietaryStatus = v.diet;
            newValues[v.period].isEdited = true;
            newValues[v.period].id = v.id
          });
          console.log(newValues);
          setValues(newValues);
        })
      }
    })
  }, [])

  const onSubmit = async () => {
    const d = moment(date);
    // 先判断所有的值 是否有不合法值 - 不合法 跳出
    for(let i = 0; i < values.length ; i++) {
      if (!values[i].bloodGlucose) {
        // 忽略没有填写的血糖空值
        continue;
      }
      if (values[i].isInsulin === null || values[i].isInsulin === '' || values[i].isInsulin === undefined) {
        return Toast.info(`${tabs[i].title}--请选择是否注射胰岛素...`);
      }
      if (values[i].isInsulin && !values[i].quantity) {
        return Toast.info(`${tabs[i].title}--请输入注射胰岛素量...`);
      }
    }
    let reqFlag = true;
    // if(id !== -1){
    //   console.log(current);
    //   // const reqData = {values.find((v:any) => v.)}
    //   const reqData = {
    //     timestamp: d,
    //     result: Number(current.bloodGlucose),
    //     pregnancy:{id: props.userid},
    //     period: current.key,
    //     insulin: current.isInsulin,
    //     insulinnote: Number(current.quantity),
    //     diet: current.dietaryStatus,
    //     exercise: current.exercise,
    //     status: 0,
    //     id:id
    //   };
    //   const res = await editBloodGlucose(reqData);
    //   console.log(res);
    //   if(res.response.status >= 200 && res.response.status < 300){
    //     // 合法
    //     Toast.info(`血糖信息修改成功`);
    //     Router.push('/signs/record?type=blood-glucose');
    //   }
    // }else{
      for(let i = 0 ; i < values.length ; i++){
        if(!values[i].bloodGlucose){
          continue;
        }
        if(values[i].isEdited){
          var res = await editBloodGlucose({
            timestamp: d,
            result: Number(values[i].bloodGlucose),
            pregnancy:{id: props.userid},
            period: values[i].key,
            insulin: values[i].isInsulin,
            insulinnote: Number(values[i].quantity),
            diet: values[i].dietaryStatus,
            exercise: values[i].exercise,
            status: 0,
            id: values[i].id
          });
        }else{
          var res = await setBloodGlucose({
            timestamp: d,
            result: Number(values[i].bloodGlucose),
            pregnancy:{id: props.userid},
            period: values[i].key,
            insulin: values[i].isInsulin,
            insulinnote: Number(values[i].quantity),
            diet: values[i].dietaryStatus,
            exercise: values[i].exercise,
            status: 0
          });
        }
        await console.log(res);
        if(res.response.status >= 200 && res.response.status < 300){
          // 合法
        }else {
          reqFlag = false;
          return Toast.info(`${tabs[i].title}--信息未能成功保存`);
        }
      }
      if(reqFlag){
        Toast.info(`血糖信息保存成功`);
        Router.push('/signs/record?type=blood-glucose');
      }

  };

  const onChange = (key: string, value: any) => {
    const index = values.findIndex((e: any) => e.key === activatedTab);
    const newValues = [...values];
    newValues[index][key] = value;
    setValues(newValues);
  }

  const tabChange = (tab:any) => {
    setActivatedTab(Number(tab.key));
  }

  // 输入异常时标红
  const inputStyles = () => {
    const { key, bloodGlucose } = current;
    if(/^[0|2|4|6]{1}$/.test(key.toString()) &&  (Number(bloodGlucose) < EMPTY_MIN || Number(bloodGlucose) > EMPTY_MAX)){
      return {color: 'red'};
    }else if( /^[1|2|5]{1}$/.test(key.toString()) && (Number(bloodGlucose) < EATING_MIN || Number(bloodGlucose) > EATING_MAX)){
      return {color: 'red'}
    }
    return {color: ""}
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
      <div
        className={styles.record}
        style={{ width: '100%', position: 'absolute', top: '1.76rem', zIndex: 9 }}
        onClick={() => router('/signs/record?type=blood-glucose')}
      >
        <IconFont type="record" size="28px" />
        <span>历史记录</span>
      </div>
      <div style={{ width: '100%', position: 'absolute', bottom: '-1.56rem', padding: '0.3rem' }}>
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
      </div>
      <Tabs
        tabs={tabs.map(v => {v.key = v.key.toString(); return v;})}
        page={activatedTab}
        tabBarPosition="top"
        onChange={(tab: any, index) => tabChange(tab)}
        renderTab={tab => <span>{tab.title}</span>}
      >
        <div style={{ height: '100%' }}>
          <div className={styles.content} style={{ paddingTop: '0.6rem' }}>
            <div className={styles['input-block']}>
            <div className={styles.dashboard}>
              <CircleProgress
                gapDegree={150}
                width={4.8*Number(fontSize.slice(0,fontSize.length-2))}
                height={4.8*Number(fontSize.slice(0,fontSize.length-2))}
                // TODO 暂时以2~9为区间
                rotate={0}
                strokeColor="#ffbe2d"
                percent={(Number(current.bloodGlucose) - 2 ) * 100 / 7}
                textArray={['2','3','4','5','6','7','8','9']}
              />
            </div>
            <div className={styles.circle}>
              <span>血糖</span>
              <div className={styles.input}>
                <input
                  type="number"
                  value={current.bloodGlucose}
                  placeholder="输入..."
                  style={inputStyles()}
                  onChange={e => onChange('bloodGlucose', e.target.value)}
                />
                <IconFont type="editor-line" size="0.36rem" />
              </div>
              <span className={styles.unit}>mmol/L</span>
            </div>
          </div>

            <List className={styles.formList}>
              <List.Item
                extra={
                  <>
                    <Checkbox
                      className={styles.checkbox}
                      checked={current.isInsulin === true}
                      onChange={() => onChange('isInsulin', true)}
                    >
                      是
                    </Checkbox>
                    <Checkbox
                      className={styles.checkbox}
                      checked={current.isInsulin === false}
                      onChange={() => onChange('isInsulin', false)}
                    >
                      否
                    </Checkbox>
                  </>
                }
              >
                <div className={styles.label}>
                  <span className={styles.required}>*</span>
                  注射胰岛素
                </div>
              </List.Item>
              {current.isInsulin ? (
                <InputItem
                  clear
                  type="digit"
                  labelNumber={7}
                  placeholder="请输入测量前的注射量"
                  value={current.quantity}
                  onChange={e => onChange('quantity', Number(e))}
                >
                  <div className={styles.label}>
                    <span className={styles.required}>*</span>
                    注射量
                    <span className={styles.unit}>(U)</span>
                  </div>
                </InputItem>
              ) : null}
              <TextareaItem
                autoHeight
                title={
                  <div className={styles.label}>
                    <span className={styles.required} />
                    饮食情况
                  </div>
                }
                placeholder="请输入测量血糖前饮食内容，方便医生了解的情况..."
                labelNumber={7}
                value={current.dietaryStatus}
                onChange={e => onChange('dietaryStatus', e)}
              />
              <TextareaItem
                autoHeight
                title={
                  <div className={styles.label}>
                    <span className={styles.required} />
                    运动情况
                  </div>
                }
                placeholder="请输入运动类型及运动时间"
                labelNumber={7}
                value={current.exercise}
                onChange={e => onChange('exercise', e)}
              />
            </List>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default connect(({global}:ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(BloodGlucoseInput)
