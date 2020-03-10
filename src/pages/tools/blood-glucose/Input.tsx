/*
 * @Description: 血糖
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:29:38
 */

import React, { useState, useEffect } from 'react';
import { Tabs, List, InputItem, TextareaItem, Toast, Checkbox } from 'antd-mobile';
import moment from 'moment';
import { Button, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import DatePicker from '../components/DatePicker';
import { router } from '@/utils/utils';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const tabs = [
  { title: '早餐前', key: 'before-breakfast' },
  { title: '早餐后', key: 'after-breakfast' },
  { title: '午餐前', key: 'before-lunch' },
  { title: '午餐后', key: 'after-lunch' },
  { title: '晚餐前', key: 'before-dinner' },
  { title: '晚餐后', key: 'after-dinner' },
  { title: '睡前', key: 'before-sleep' },
];

// 数据结构
const json = [
  {
    key: 'before-breakfast',
    bloodGlucose: 100,
    isInsulin: null,
    quantity: null,
    dietaryStatus: '',
  },
  { key: 'after-breakfast', bloodGlucose: 10 },
  { key: 'before-lunch', bloodGlucose: 99 },
  { key: 'after-lunch', bloodGlucose: 69 },
  { key: 'before-dinner', bloodGlucose: '' },
  { key: 'after-dinner', bloodGlucose: '' },
  { key: 'before-sleep', bloodGlucose: '' },
];

function BloodGlucoseInput() {
  // TODO 根据tab key获取提交的值
  const [date, setDate] = useState(now);
  const [activatedTab, setActivatedTab] = useState('before-breakfast');
  const [values, setValues] = useState(json);
  const [current, setCurrent] = useState({
    bloodGlucose: '',
    isInsulin: null,
    quantity: undefined,
    dietaryStatus: '',
  });

  useEffect(() => {
    const index = values.findIndex(e => e.key === activatedTab);
    setCurrent(values[index.toString()]);
    return () => {};
  }, [activatedTab]);

  const onSubmit = () => {
    const d = moment(date).format('YYYY-MM-DD');
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
    console.log({ d, current });
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
        mode="date"
        title="选择日期"
        extra="请选择日期"
        value={date}
        onChange={date => setDate(date)}
      />
      <Tabs
        tabs={tabs}
        page={activatedTab}
        tabBarPosition="top"
        onChange={(tab: any, index) => setActivatedTab(tab.key)}
        renderTab={tab => <span>{tab.title}</span>}
      >
        <div style={{ height: '100%' }}>
          <div className={styles.content}>
            <div className={styles.text} onClick={() => router('/weight/record')}>
              <IconFont type="record" size="28px" />
              <span>历史记录</span>
            </div>
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
            </List>
          </div>
          <div className={styles.bottom}>
            <Button type="primary" onClick={onSubmit}>
              保存
            </Button>
          </div>
        </div>
      </Tabs>
      <BackButton />
    </div>
  );
}

export default BloodGlucoseInput
