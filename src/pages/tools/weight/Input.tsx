/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:39
 * @Description: 体重输入
 */

import React from 'react';
import { connect } from 'dva';
import { DatePicker  } from 'antd-mobile';

import { router } from '@/utils/utils';
import { ConnectState } from '@/models/connect';
import BackButton from '@/components/BackButton';
import { WhiteSpace, IconFont, Button } from '@/components/antd-mobile';
import GaugeInput from '../components/GaugeInput';
import styles from './styles.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const minDate = new Date(nowTimeStamp - 1000*60*60*24*30);
const maxDate = new Date(nowTimeStamp);

interface IProps {
  extra?: string
  onClick?: () => void
}

// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick }: IProps) => (
  <div
    onClick={onClick}
    className={styles.datePickerList}
  >
    {extra}
  </div>
);

function WeightInput() {
  const [date, setDate] = React.useState(now);

  React.useEffect(() => {

  }, [])

  return (
    <div className="page">
      <div className={styles.date}>
        <DatePicker
          mode="date"
          title="选择监测时间"
          extra="请选择监测时间"
          minDate={minDate}
          maxDate={maxDate}
          value={date}
          onChange={date => setDate(date)}
        >
          <CustomChildren />
        </DatePicker>
      </div>
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
