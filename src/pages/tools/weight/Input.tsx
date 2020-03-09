/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:39
 * @Description: 体重输入
 */

import React, { useState } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Toast } from 'antd-mobile';

import DatePicker from '../components/DatePicker';
import { ConnectState } from '@/models/connect';
import BackButton from '@/components/BackButton';
import { IconFont, Button, WhiteSpace } from '@/components/antd-mobile';
import GaugeInput from '../components/GaugeInput';
import { router } from '@/utils/utils';
import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = new Date(nowTimeStamp - 1000*60*60*24*30);
const maxDate = new Date(nowTimeStamp);

interface IProps {
  extra?: string
  onClick?: () => void
}

function WeightInput() {
  const [date, setDate] = useState(now);
  const [weight, setWeight] = useState();

  React.useEffect(() => {

  }, []);

  const onSubmit = () => {
    const d = moment(date).format('YYYY-MM-DD');
    if (!weight) {
      return Toast.info('请输入体重数值...');
    }
    console.log({ d, weight });
  }

  return (
    <div className={styles.container}>
      <DatePicker
        mode="date"
        title="选择日期"
        extra="请选择日期"
        minDate={minDate}
        maxDate={maxDate}
        value={date}
        onChange={date => setDate(date)}
      />
      <WhiteSpace />
      <div className={styles.content}>
        <div className={styles.text} onClick={() => router('/weight/record')}>
          <IconFont type="record" size="28px" />
          <span>历史记录</span>
        </div>
        {/* <GaugeInput id="weight" title="体重" suffix="kg" min={30} max={80} /> */}
        <div className={styles.circle}>
          <span>体重</span>
          <div className={styles.input}>
            <input
              type="number"
              placeholder="输入..."
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
            />
            <IconFont type="editor-line" size="0.36rem" />
          </div>
          <span className={styles.unit}>kg</span>
        </div>
      </div>
      <div style={{ margin: '.5rem .3rem' }}>
        <Button type="primary" onClick={onSubmit}>保存</Button>
        <BackButton />
      </div>
    </div>
  );
}

export default connect(({ global, loading }: ConnectState) => ({
  loading: loading,
  currentPregnancy: global.currentPregnancy,
}))(WeightInput);
