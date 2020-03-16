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
  timestamp:string, systolic: number, diastolic: number,
  map?: number,
  pregnancy?: {
    id: number
  }
}
const serviceData:Array<ServiceDataItem> = [
  {timestamp: '2/1', systolic: 110, diastolic: 58},
  {timestamp: '2/2', systolic: 89, diastolic: 76},
  {timestamp: '2/3', systolic: 113, diastolic: 72},
  {timestamp: '2/4', systolic: 116, diastolic: 80},
  {timestamp: '2/6', systolic: 101, diastolic: 77},
  {timestamp: '2/6', systolic: 124, diastolic: 83},
  {timestamp: '2/7', systolic: 111, diastolic: 71},
]

function BloodPressureRecord() {
  const bloodPressureChart = useRef(null);

  // date与日期未填入
  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {key: 'systolic',label: '收缩压',fill: false,borderColor: '#f5bff0',pointBackgroundColor: [], pointBorderColor: [],pointRadius: [],data: []},
        {key: 'diastolic',label: '收缩压',fill: false,borderColor: '#fcdebb',pointBackgroundColor: [],pointBorderColor: [],pointRadius: [],data: []},
        {label: '正常',data: [],borderColor: '#C3C5C6'},
        {label: '异常',data: [],borderColor: '#DC143C',fill: false}
      ]
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
        xAxes: [{
          // scaleLabel: {
          //   display: true,
          //   labelString: '日期',
          //   fontSize:20
          // }
          ticks: {
            fontSize: 20
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '测量值',
            fontSize:20
          },
          ticks: {
            max: 150,
            min: 40,
            stepSize: 10,
            fontSize: 25
          }
        }]
      }
    }
  }

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, COUNT_DURATION:number = 5) => {
    let count = 0;
    const COUNT_PER = (serviceData.length / COUNT_DURATION) | 0 ;

    const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
    const [ defaultPointRadius, errorPointRadius ] = [2,8];
    
    serviceData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据
      const len = options.data.datasets.length;
      for(let i = 0 ; i < len; i++){
        const data = v[options.data.datasets[i].key];
        if(data) {
          if(options.data.datasets[i].key === 'systolic') {
            if(data < 90 || data >= 140) {
              options.data.datasets[i].pointBackgroundColor.push(errorColor);
              options.data.datasets[i].pointBorderColor.push(errorColor);
              options.data.datasets[i].pointRadius.push(errorPointRadius);
            }else {
              options.data.datasets[i].pointBackgroundColor.push(defaultColor);
              options.data.datasets[i].pointBorderColor.push(defaultColor);
              options.data.datasets[i].pointRadius.push(defaultPointRadius);
            }
          }else if(options.data.datasets[i].key === 'diastolic'){
            if(data < 50 || data >= 90) {
              options.data.datasets[i].pointBackgroundColor.push(errorColor);
              options.data.datasets[i].pointBorderColor.push(errorColor);
              options.data.datasets[i].pointRadius.push(errorPointRadius);
            }else {
              options.data.datasets[i].pointBackgroundColor.push(defaultColor);
              options.data.datasets[i].pointBorderColor.push(defaultColor);
              options.data.datasets[i].pointRadius.push(defaultPointRadius);
            }
          }
          // @ts-ignore
          options.data.datasets[i].data.push(data);
        }
      }
      if(count === COUNT_PER){
        // @ts-ignore
        options.data.labels.push(v['timestamp']);
        count = 0;
      }else {
        options.data.labels.push(" ");
        count++;
      }
    });
    return options;
  }


  const newChart = () => {
    // @ts-ignore
    const ctx = bloodPressureChart.current.getContext('2d');
    chartOptions = convertChartData(chartOptions,serviceData);
    const lineChart = new Chart(ctx,chartOptions)
  }
  
  useEffect(() => newChart());

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <canvas ref={bloodPressureChart} className={styles.canvas}></canvas>
      </div>
      <BackButton/>

    </div>
  )
}

export default BloodPressureRecord
