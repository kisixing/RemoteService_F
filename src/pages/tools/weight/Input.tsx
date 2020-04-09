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
import { IconFont, Button, WhiteSpace } from '@/components/antd-mobile';
import { router } from '@/utils/utils';

import CircleProgress from '../components/CricleProgress';

import styles from '../blood-pressure/Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const fontSize = document.getElementsByTagName('html')[0].style.fontSize;

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
        mode="datetime"
        title="选择日期"
        extra="请选择日期"
        value={date}
        onChange={date => setDate(date)}
      />
      <WhiteSpace />
      <div className={styles.content}>
        <div className={styles.text} onClick={() => router('/signs/record?type=weight')}>
          <IconFont type="record" size="28px" />
          <span>历史记录</span>
        </div>
        <div className={styles['input-block']}>
          <div className={styles.dashboard}>
            <CircleProgress
              width={4.8*Number(fontSize.slice(0,fontSize.length-2))}
              height={4.8*Number(fontSize.slice(0,fontSize.length-2))}
              gapDegree={150}
              rotate={0}
              strokeColor="#ffbe2d"
              percent={Number(weight)}
              textArray={['0','20','40','60','80','100']}
            />
          </div>
          <div className={styles.circle}>
            <span>体重</span>
            <div className={styles.input}>
              <input 
                type="number"
                placeholder="输入..."
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
              <IconFont type="editor-line" size="0.36rem" />
            </div>
            <span className={styles.unit}>kg</span>
          </div>
        </div>
      </div>
      <div style={{ margin: '.5rem .3rem' }}>
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
      </div>
    </div>
  );
}

export default connect(({ global, loading }: ConnectState) => ({
  loading: loading,
  currentPregnancy: global.currentPregnancy,
}))(WeightInput);
