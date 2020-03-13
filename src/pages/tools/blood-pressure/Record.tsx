/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:03:19
 * @Description: 血氧记录
 */

import React,{ useRef, useEffect } from 'react'
import Chart from 'chart.js';

import BackButton from '@/components/BackButton';
import styles from './Record.less'

interface ServiceDataItem {
  date:string, sysion: number, diastou: number
}
const serviceData:Array<ServiceDataItem> = [
  {date: '2/1', sysion: 110, diastou: 58},
  {date: '2/2', sysion: 114, diastou: 76},
  {date: '2/3', sysion: 113, diastou: 72},
  {date: '2/4', sysion: 116, diastou: 80},
  {date: '2/6', sysion: 101, diastou: 77},
  {date: '2/6', sysion: 124, diastou: 83},
  {date: '2/7', sysion: 111, diastou: 71},
]

function BloodPressureRecord() {
  const bloodPressureChart = useRef(null);

  // date与日期未填入
  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '收缩压',
        fill: false,
        borderColor: '#f5bff0',
        pointBackgroundColor: ['#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#DC143C','#C3C5C6'], 
        pointBorderColor: ['#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#DC143C','#C3C5C6'],
        pointRadius: 8,
        data: []
      },{
        label: '收缩压',
        fill: false,
        borderColor: '#fcdebb',
        pointBackgroundColor: ['#DC143C','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6'],
        pointBorderColor: ['#DC143C','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6','#C3C5C6'],
        pointRadius: 8,
        data: []
      }]
    },
    options: {
      responsive: true,
      steppedLine: true,
      legend: {
        labels: {
          fontSize: 25,
          fontColor: '#000000'
        }
      },
      title: {
        display: true,
        fontSize: 28,
        fontColor: '#000000',
        FontFamily: 'Arial',
        text: '血压曲线'
      },
      layout: {
        padding: {
          top: 0,
          left: 10,
          right: 10,
          bottom :10
        }
      },
      elements:{
        line: {
          tension: 0
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      scales: {
        // xAxes: [{
        //   scaleLabel: {
        //     display: true,
        //     labelString: '日期',
        //     fontSize:20
        //   }
        // }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '测量值',
            fontSize:20
          },
          ticks: {
            max: 130,
            min: 50,
            stepSize: 5
          }
        }]
      }
    }
  }

  const newChart = () => {
    // @ts-ignore
    const ctx = bloodPressureChart.current.getContext('2d');
    serviceData.forEach((v:ServiceDataItem) => {
      chartOptions.data.labels.push(v.date);
      chartOptions.data.datasets[0].data.push(v.sysion);
      chartOptions.data.datasets[1].data.push(v.diastou);
    });
    const lineChart = new Chart(ctx,chartOptions)
  }
  useEffect(() => newChart());
  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <canvas ref={bloodPressureChart} className={styles.canvas}></canvas>
        <div>
          <div />
          <div><span>正常</span></div>
          <div/>
          <div><span>异常</span></div>
          <div/>
          <div><span>舒张压</span></div>
          <div/>
          <div><span>收缩压</span></div>
        </div>
      </div>
      <BackButton/>

    </div>
  )
}

export default BloodPressureRecord
