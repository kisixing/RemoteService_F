/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:39
 * @Description: 体重输入
 */

import React from 'react';
import { connect } from 'dva';

import DatePicker from '../components/DatePicker';
import { ConnectState } from '@/models/connect';
import BackButton from '@/components/BackButton';
import { IconFont, Button } from '@/components/antd-mobile';
import GaugeInput from '../components/GaugeInput';
import { router } from '@/utils/utils';
import styles from './styles.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = new Date(nowTimeStamp - 1000*60*60*24*30);
const maxDate = new Date(nowTimeStamp);

interface IProps {
  extra?: string
  onClick?: () => void
}

function WeightInput() {
  const [date, setDate] = React.useState(now);

  React.useEffect(() => {

  }, [])

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
      <div className={styles.content}>
        <div className={styles.text} onClick={() => router('/weight/record')}>
          <IconFont type="icon_article_line" size="34px" />
          历史记录
        </div>
        <GaugeInput id="weight" title="体重" suffix="kg" min={30} max={80} />
      </div>
      <div style={{ margin: '.5rem .3rem' }}>
        <Button type="primary">保存</Button>
        <BackButton />
      </div>
    </div>
  );
}

export default connect(({ global, loading }: ConnectState) => ({
  loading: loading,
  currentPregnancy: global.currentPregnancy,
}))(WeightInput);
