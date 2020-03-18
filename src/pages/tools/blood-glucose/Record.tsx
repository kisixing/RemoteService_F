/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:00:52
 * @Description: 血糖记录
 */

import React,{ useRef, useState, useEffect } from 'react'
import Chart from 'chart.js';
import { Tabs } from 'antd-mobile';
import { PERIOD_CODE } from './config';
import { getBloodGlucose } from '@/services/tools';

import styles from './Record.less';
import { spawn } from 'child_process';

interface ServiceDataItem {
  id:number,
  timestamp:string,
  result:number,
  period:PERIOD_CODE,
  pregnancyId:{
    id:number
  }
}

const EMPTY_MIN = 3.9,
EMPTY_MAX = 6.1,
EATING_MIN = 3.9,
EATING_MAX =7.8;

const periodString = ['空腹','早餐后2H','午餐前2H','午餐后2H','晚餐前2H','晚餐后2H','睡前'];

function BloodGlucoseRecord() {

  const hChart = useRef(null),tChart = useRef(null);
  let chartH,chartT;

  const [listData,setListData] = useState([]);
  

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
        text: ''
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
            fontSize: 20 
          }
        }],
      }
    }
  }

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>,isHistory: boolean, COUNT_DURATION:number = 5) => {
    let count = 0;
    const COUNT_PER = (serviceData.length / COUNT_DURATION) | 0 ;
    serviceData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据
      const len = options.data.datasets.length;
      for(let i = 0 ; i < len; i++){
        // @ts-ignore
        options.data.datasets[i].data.push(v[options.data.datasets[i].key]);
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
    const ctx = hChart.current.getContext('2d');
    chartH = new Chart(ctx, convertChartData(chartOptions,listData,true));
    //@ts-ignore
    const ctx1 = tChart.current.getContext('2d');
    chartT = new Chart(ctx1, convertChartData(chartOptions,listData,false));
  }

  useEffect(()=> {
    newChart();
    getBloodGlucose({pregnancyId: '207'}).then(res => {
      setListData(res.data);
    })
  },[]);

  const tab = [
    {title: '历史记录'},
    {title: '当天记录'}
  ]
  console.log(listData);
  return (
    <div className={styles.container}>
      <Tabs tabs={tab}>
        <div className={styles.canvas}>
            <canvas ref={hChart}></canvas>
        </div>
        <div className={styles.canvas}>
          <canvas ref={tChart}></canvas>
        </div>
      </Tabs>
      <div>
        <span>显示方式待定</span>
        {listData.map((item: ServiceDataItem) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.header}>
                <div><span>{item.timestamp.slice(0, 10)} -- {item.timestamp.slice(11, 19)} -- {periodString[item.period]}</span></div>
              </div>
              <hr />
              <div className={styles.content}>
                <div><span>血糖值：{item.result}</span></div>
                {item.period === PERIOD_CODE.FASTING || item.period === PERIOD_CODE.BEFORE_S ? (
                  <div>
                    {item.result < EMPTY_MIN || item.result > EMPTY_MAX ? <span>异常</span> : <span>正常</span>}
                  </div>
                ) : (
                  <div>
                    {item.result < EATING_MIN || item.result > EATING_MAX ? <span>异常</span> : <span>正常</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BloodGlucoseRecord;
