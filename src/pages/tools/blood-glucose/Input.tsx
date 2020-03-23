/*
 * @Description: 血糖
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:29:38
 */

import React, { useState, useEffect } from 'react';
import { Tabs, List, InputItem, TextareaItem, Toast, Checkbox } from 'antd-mobile';
import Router from 'umi/router';
import moment from 'moment';
import { Button, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import DatePicker from '../components/DatePicker';
import { router } from '@/utils/utils';
import { PERIOD_CODE } from './config';
import { setBloodGlucose } from '@/services/tools';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const tabs:Array<any> = [
  { title: '早餐前', key: PERIOD_CODE.FASTING },
  { title: '早餐后', key: PERIOD_CODE.AFTER_B },
  { title: '午餐前', key: PERIOD_CODE.BEFORE_L },
  { title: '午餐后', key: PERIOD_CODE.AFTER_L },
  { title: '晚餐前', key: PERIOD_CODE.BEFORE_D },
  { title: '晚餐后', key: PERIOD_CODE.AFTER_D},
  { title: '睡前', key: PERIOD_CODE.BEFORE_S },
];

// 数据结构
const json:Array<any> = [
  { key: PERIOD_CODE.FASTING, bloodGlucose: 10 },
  { key: PERIOD_CODE.AFTER_B , bloodGlucose: 99 },
  { key: PERIOD_CODE.BEFORE_L, bloodGlucose: 69 },
  { key: PERIOD_CODE.AFTER_L, bloodGlucose: '' },
  { key: PERIOD_CODE.BEFORE_D, bloodGlucose: '' },
  { key: PERIOD_CODE.AFTER_D, bloodGlucose: '' },
  { key: PERIOD_CODE.BEFORE_S, bloodGlucose: '' },
];

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
    const index = values.findIndex(e => e.key === activatedTab);
    setCurrent(values[index]);
    return () => {};
  }, [activatedTab]);
  useEffect(() => {
    const h = now.getHours();
    if(h >= 3 && h < 8){
      setActivatedTab(PERIOD_CODE.FASTING);
    }else if(h >= 8 && h < 10){
      setActivatedTab(PERIOD_CODE.AFTER_B);
    }else if(h >= 10 && h < 12){
      setActivatedTab(PERIOD_CODE.BEFORE_L);
    }else if(h >= 12 && h < 15){
      setActivatedTab(PERIOD_CODE.AFTER_L);
    }else if(h >= 15 && h < 18){
      setActivatedTab(PERIOD_CODE.BEFORE_D);
    }else if(h >= 18 && h < 21){
      setActivatedTab(PERIOD_CODE.AFTER_D);
    }else{
      setActivatedTab(PERIOD_CODE.BEFORE_S);
    }
  },[])


  const onSubmit = () => {
    const d = moment(date);
    // const index = values.findIndex(e => e.key === activatedTab);
    // const current = values[index];
    
    if (!current.bloodGlucose) {
      return Toast.info('请输入血糖数值...');
    }
    if (current.isInsulin === null || current.isInsulin === '' || current.isInsulin === undefined) {
      return Toast.info('请选择是否注射胰岛素...');
    }
    if (current.isInsulin && !current.quantity) {
      return Toast.info('请输入注射胰岛素量...');
    }
    const reqData = {
      timestamp: d,
      result: Number(current.bloodGlucose),
      pregnancy:{id: props.userid},
      period: current.key,
      insulin: current.isInsulin,
      insulinnote: Number(current.quantity),
      diet: current.dietaryStatus,
      exercise: current.exercise, 
      status: 0
    };
    // @ts-ignore
    setBloodGlucose(reqData).then(r => {
      if(r.response.status >=200 && r.response.status < 300){
        Toast.success('血糖信息保存成功');
        Router.push('/signs/record?type=blood-glucose');
      }
    });
  };

  const onChange = (key: string, value: any) => {
    const index = values.findIndex((e: any) => e.key === activatedTab);
    const newValues = [...values];
    newValues[index][key] = value;
    setValues(newValues);
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
        onClick={() => router('/signs/blood-glucose/record')}
      >
        <IconFont type="record" size="28px" />
        <span>历史记录</span>
      </div>
      <div style={{ width: '100%', position: 'absolute', bottom: '-1.56rem', padding: '0.3rem' }}>
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
      </div>
      {/* 类型对不上 */}
      <Tabs
        tabs={tabs.map(v => {v.key = v.key.toString(); return v;})}
        page={activatedTab}
        tabBarPosition="top"
        onChange={(tab: any, index) => setActivatedTab(Number(tab.key))}
        renderTab={tab => <span>{tab.title}</span>}
      >
        <div style={{ height: '100%' }}>
          <div className={styles.content} style={{ paddingTop: '0.6rem' }}>
            <div className={styles.circle}>
              <span>血糖</span>
              <div className={styles.input}>
                <input
                  type="number"
                  value={current.bloodGlucose}
                  placeholder="输入..."
                  onChange={e => onChange('bloodGlucose', Number(e.target.value))}
                />
                <IconFont type="editor-line" size="0.36rem" />
              </div>
              <span className={styles.unit}>mmol/L</span>
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
                    饮食情况
                  </div>
                }
                placeholder="请输入运动情况，方便医生了解的情况..."
                labelNumber={7}
                value={current.exercise}
                onChange={e => onChange('exercise', e)}
              />
            </List>
          </div>
        </div>
      </Tabs>
      <BackButton />
    </div>
  );
}

export default BloodGlucoseInput
