/*
 * @Description: 血糖
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:29:38
 */

import React, { useState } from 'react';
import { Tabs, List, InputItem, TextareaItem, Toast, Checkbox } from 'antd-mobile';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
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

function BloodGlucoseInput() {
  // TODO 根据tab key获取提交的值
  const [date, setDate] = useState(now);
  const [bloodGlucose, setBloodGlucose] = useState();
  const [isInsulin, setInsulin] = useState();
  const [quantity, setQuantity] = useState();
  const [dietaryStatus, setDietaryStatus] = useState();

  const onSubmit = () => {
    const d = moment(date).format('YYYY-MM-DD');
    if (!bloodGlucose) {
      return Toast.info('请输入血糖数值...');
    }
    if (!isInsulin) {
      return Toast.info('请选择是否注射胰岛素...');
    }
    if (isInsulin && !quantity) {
      return Toast.info('请输入注射胰岛素量...');
    }
    console.log({ d, bloodGlucose, isInsulin, quantity, dietaryStatus });
  };

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
        initialPage={1}
        tabBarPosition="top"
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
                  value={bloodGlucose}
                  placeholder="输入..."
                  onChange={e => setBloodGlucose(Number(e.target.value))}
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
                      checked={isInsulin === true}
                      onChange={() => setInsulin(true)}
                    >
                      是
                    </Checkbox>
                    <Checkbox
                      className={styles.checkbox}
                      checked={isInsulin === false}
                      onChange={() => setInsulin(false)}
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
              {isInsulin ? (
                <InputItem
                  clear
                  type="digit"
                  labelNumber={7}
                  placeholder="请输入测量前的注射量"
                  value={quantity}
                  onChange={e => setQuantity(e)}
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
                    <span className={styles.required}/>
                    饮食情况
                  </div>
                }
                placeholder="请输入测量血糖前饮食内容，方便医生了解的情况..."
                labelNumber={7}
                value={dietaryStatus}
                onChange={e => setDietaryStatus(e)}
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
