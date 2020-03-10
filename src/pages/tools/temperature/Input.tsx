/*
 * @Description: 血压输入
 * @Author: Zhong Jun
 * @Date: 2020-03-06 18:30:21
 */

import React, { useState } from 'react';
import { Toast } from 'antd-mobile';
import moment from 'moment';
import { Button, WhiteSpace, IconFont } from '@/components/antd-mobile';
import BackButton from '@/components/BackButton';
import { router } from '@/utils/utils';
import DatePicker from '../components/DatePicker';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

function TemperatureInput() {
  const [date, setDate] = useState(now);
  const [temperature, setTemperature] = useState('')

  const onSubmit = () => {
    const d = moment(date).format('YYYY-MM-DD');
    if (!temperature) {
      return Toast.info('请输入体温数值...');
    }
    console.log({ d, temperature });
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

export default TemperatureInput;
