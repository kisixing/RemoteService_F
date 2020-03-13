/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:00:52
 * @Description: 血糖记录
 */

import React,{ useRef, useState, useEffect } from 'react'
import Chart from 'chart.js';
import { WingBlank } from 'antd-mobile';

// import { getBloodGlucose } from '@/services/tools';

import styles from './Record.less';

interface ServiceDataItem {
  date:string, 
  empty: number,
  afterBreakfast: number,
  beformLunch: number, afterLunch: number,
  beforeDinner: number, afterDinner: number,
  beforeSleep: number
}
// 历史
const serviceData:Array<ServiceDataItem> = [
  {date: '2/1', empty: 4.5,afterBreakfast: 5.1,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/2', empty: 4.2,afterBreakfast: 5.2,beformLunch: 4.2, afterLunch: 5.4, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/3', empty: 4.3,afterBreakfast: 5.4,beformLunch: 4.4, afterLunch: 5.2, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/4', empty: 4.4,afterBreakfast: 5.1,beformLunch: 4.5, afterLunch: 5.3, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/5', empty: 4.6,afterBreakfast: 5.3,beformLunch: 4.2, afterLunch: 5.3, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/6', empty: 4.7,afterBreakfast: 5.0,beformLunch: 4.7, afterLunch: 5.3, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/7', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/8', empty: 4.3,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/9', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/10', empty: 4.2,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/11', empty: 4.5,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/12', empty: 4.2,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/13', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/14', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/15', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/16', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/17', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/18', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/19', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/20', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/21', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/22', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/23', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/24', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/25', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/26', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/27', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/28', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4},
  {date: '2/29', empty: 4.1,afterBreakfast: 5.6,beformLunch: 4.1, afterLunch: 5.1, beforeDinner: 4.2, afterDinner: 5.2,beforeSleep: 4}
];
function BloodGlucoseRecord() {

  const bloodGlucoseChart = useRef(null);

  const [isHistory, setIsHistory] = useState(true);

  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {key: 'empty', label: '空腹', fill: false, borderColor: '#FFC0CB', pointBackgroundColor: '##C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'afterBreakfast', label: '早餐后',fill: false, borderColor: '#DDA0DD', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'beformLunch', label: '午餐前',fill: false, borderColor: '#6495ED', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'afterLunch', label: '午餐后',fill: false, borderColor: '#48D1CC', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'beforeDinner', label: '晚餐前',fill: false, borderColor: '#FFFF00', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'afterDinner', label: '晚餐后',fill: false, borderColor: '#FF4500', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
        {key: 'beforeSleep', label: '睡前',fill: false, borderColor: '#C0C0C0', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: []},
      ]
    },
    options: {
      responsive: true,
      steppedLine: true,
      legand: {
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
        text: isHistory ? '历史记录' : '当天记录'
      },
      layout: {
        padding:{
          top: 0,
          left: 10,
          right: 10,
          bottom :10
        }
      },
      elements:{
        line:{
          // tension: 0
        }
      },
      tooltips:{
        mode: 'index',
        intersect: false,
        titleFontSize: 20,
        bodyFontSize: 20
      },
      scales: { 
        xAxes: [{
          // 坐标title
          scaleLabel: {
            // display: true,
            // labelString: '时间',
            // fontSize: 20,
            // fontStyle: 'italic'
          },
          // 网格线
          gridLines :{
            display: false
          },
          // 坐标轴
          ticks: {
            fontSize: 20,
            fontWeight: 400
          }
        }],
        yAxes: [{ 
          scaleLabel:{ 
            display: true, 
            labelString: '测量值', 
            fontSize: 20
          },
          ticks: {
            // 幅度
            max: 6,
            min: 3.5,
            stepSize: 0.5,
            // style
            fontSize: 20,
            fontWeight: 500
          }
        }],
      }
    }
  }

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, COUNT_DURATION:number = 5) => {
    let count = 0;
    serviceData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据
      const len = options.data.datasets.length;
      for(let i = 0 ; i < len; i++){
        // @ts-ignore
        options.data.datasets[i].data.push(v[options.data.datasets[i].key]);
      }
      if(count === 5){
        // @ts-ignore
        options.data.labels.push(v['date']);
        count = 0;
      }else {
        options.data.labels.push(" ");
        count++;
      }
    });
    return options;
  }


  const newChart = () => {
    //@ts-ignore
    const ctx = bloodGlucoseChart.current.getContext('2d');
    if(isHistory) {
      chartOptions = convertChartData(chartOptions,serviceData);
    }else {

    }
    const lineChart = new Chart(ctx, chartOptions);
  }

  useEffect(()=> {
    newChart();
    // getBloodGlucose({pregnancyId: '207'}).then(res => {
    //   console.log(res);
    // })
  },['isHistory']);

  return (
    <div className={styles.container}>
      <div className={styles.header}>

      </div>
      <div className={styles.canvas}>
        <canvas ref={bloodGlucoseChart}></canvas>
      </div>
    </div>
  )
}

export default BloodGlucoseRecord;
