/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:04:22
 * @Description: 体温记录
 */

import React,{ useRef, useState, useEffect } from 'react'
import Chart from 'chart.js';
import { WingBlank } from 'antd-mobile';

// import { getBloodGlucose } from '@/services/tools';

import styles from './Record.less';

interface ServiceDataItem {
  date:string, 
  temperature: number
}
// 历史
const serviceData:Array<ServiceDataItem> = [
  {date: '2/1', temperature: 36.3},
  {date: '2/2', temperature: 36.2},
  {date: '2/3', temperature: 37.1},
  {date: '2/4', temperature: 36.5},
  {date: '2/5', temperature: 36.1},
  {date: '2/6', temperature: 36.4},
  {date: '2/7', temperature: 36.2},
];
function TemperatureRecord() {

  const TemperatureChart = useRef(null);

  const [isHistory, setIsHistory] = useState(true);

  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {key: 'temperature', label: '体温', fill: false, borderColor: '#FFC0CB', pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: []},
        {label: '异常', fill: false, borderColor: '#dc143c',}
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
            max: 39,
            min: 36,
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
    const COUNT_PER = (serviceData.length / COUNT_DURATION) | 0 ;

    const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
    const [ defaultPointRadius, errorPointRadius ] = [2,8];
    
    serviceData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据
      const len = options.data.datasets.length;
      for(let i = 0 ; i < len; i++){
        const data = v[options.data.datasets[i].key];
        if(data) {
          if(data > 37){
          options.data.datasets[i].pointBackgroundColor.push(errorColor);
          options.data.datasets[i].pointBorderColor.push(errorColor);
          options.data.datasets[i].pointRadius.push(errorPointRadius);
        }else{
          options.data.datasets[i].pointBackgroundColor.push(defaultColor);
          options.data.datasets[i].pointBorderColor.push(defaultColor);
          options.data.datasets[i].pointRadius.push(defaultPointRadius);
        }
        // @ts-ignore
        options.data.datasets[i].data.push(data);
        }
      }
      if(count === COUNT_PER){
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
    const ctx = TemperatureChart.current.getContext('2d');
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
      {/* <div className={styles.header}>

      </div> */}
      <div className={styles.canvas}>
        <canvas ref={TemperatureChart}></canvas>
      </div>
    </div>
  )
}

export default TemperatureRecord;
