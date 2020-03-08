/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 17:12:21
 * @Description: 血氧
 */

import React from 'react';
import { InputItem, List, Toast } from 'antd-mobile';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import DatePicker from '../components/DatePicker';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

function BloodOxygenInput() {
  const [date, setDate] = React.useState(now);
  const [bloodOxygen, setBloodOxygen] = React.useState();
  const [pulseRate, setPulseRate] = React.useState();

  const onSubmit = () => {
    const d = moment(date).format('YYYY-MM-DD');
    if (!bloodOxygen) {
      return Toast.info('请输入血氧数值...');
    }
    if (!pulseRate) {
      return Toast.info('请输入脉率数值...');
    }
    console.log({ d, bloodOxygen, pulseRate });
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
      <WhiteSpace />
      <div className={styles.content}>
        <div className={styles.text}>
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

export default BloodOxygenInput
