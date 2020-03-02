/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:39
 * @Description: 体重输入
 */

import React from 'react';
import { connect } from 'dva';
import { DatePicker  } from 'antd-mobile';
import Chart from 'chart.js';

import { router } from '@/utils/utils';
import { ConnectState } from '@/models/connect';
import BackButton from '@/components/BackButton';
import { WhiteSpace, IconFont } from '@/components/antd-mobile';
import styles from './styles.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);

Chart.pluginService.register({
  beforeDraw: function(chart) {
    var width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx

    ctx.restore()
    var fontSize = (height / 114).toFixed(2)
    ctx.font = fontSize + 'em sans-serif'
    ctx.textBaseline = 'middle'

    var text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2

    ctx.fillText(text, textX, textY)
    ctx.save()
  },
})

interface IProps {

}

// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick }) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '64px', lineHeight: '64px', textAlign: 'center' }}
  >
    {extra}
  </div>
);

function WeightInput() {
  let canvasRef = React.createRef();

  React.useEffect(() => {
    draw()
  }, [])

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Yellow", "Green"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
  }

  return (
    <div className="page">
      <div className={styles.date}>
        <DatePicker
          mode="date"
          title="Select Date"
          extra="Optional"
          minDate={minDate}
          maxDate={maxDate}
          value={now}
          onChange={date => this.setState({ date })}
        >
          <CustomChildren />
        </DatePicker>
      </div>
      <WhiteSpace />
      <div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <BackButton />
    </div>
  )
}

export default connect(({ global, loading }: ConnectState) => ({
  loading: loading,
  currentPregnancy: global.currentPregnancy,
}))(WeightInput);
