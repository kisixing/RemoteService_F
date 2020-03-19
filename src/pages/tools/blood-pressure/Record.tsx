/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:03:19
 * @Description: 血氧记录
 */

import React,{ useRef, useEffect, useState } from 'react'
import Chart from 'chart.js';
import {Tabs} from 'antd-mobile';

import {sortDate} from '@/utils/utils';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { getBloodPressures } from '@/services/tools';

import styles from './Record.less'


/**
 * 数据展示备注
 *  当用户查看历史记录 需要显示最高压和最低压
 */
interface ServiceDataItem {
  timestamp:string, systolic: number, diastolic: number,
  map?: number,
  id:number,
  pregnancy?: {
    id: number
  }
}

const SYS_MAX=139,
SYS_MIN=90,
DIA_MAX=89,
DIA_MIN=50;


function BloodPressureRecord() {
  const hChart=useRef(null),tChart=useRef(null);
  let chartH,chartT;
  const [listData,setListData] = useState([]);
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
          // tension: 0
        },
      },
      tooltips: {
        mode: 'nearest',
        intersect: false,
        titleFontSize: 20,
        bodyFontSize: 20
      },
      scales: {
        xAxes: [{
          // scaleLabel: {
          //   display: true,
          //   labelString: '日期',
          //   fontSize:20
          // }
          ticks: {
            // TODO 之后再调这个位置
            fontSize: 20,
            fontWeight: 400,
            autoSkip: true,
            autoSkipPadding: 50
          },
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '测量值',
            fontSize:20
          },
          ticks: {
            max: 150,
            min: 30,
            stepSize: 30,
            fontSize: 20,
            autoSkip: true
          }
        }]
      }
    }
  }

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, isHistory: boolean, COUNT_DURATION:number = 5) => {
    //
    let nOptions = JSON.parse(JSON.stringify(options));
    // 异常|正常 样式
    const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
    const [ defaultPointRadius, errorPointRadius ] = [2,8];
    // 定义标准日期
    const todayStr = moment(new Date()).format('YYYY-MM-DD');
    // 深拷贝
    let targetData:Array<ServiceDataItem>|false = serviceData.map(v => v);
    if(isHistory){
      // 展示历史数据，将单天最大值保留
      for(let i=0;i<targetData.length;) {
        for(let j=1;i+j<targetData.length;){
          if(targetData[i].timestamp.slice(0,10) === targetData[i+j].timestamp.slice(0,10)){
            if(targetData[i].systolic < targetData[i+j].systolic){
              targetData.splice(i,1);
            }else{
              targetData.splice(i+j,1);
            }
          }else{
            j++;
          }
        }
        i++; 
      }
    }else{
      targetData = sortDate<ServiceDataItem>(targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr),"timestamp");
    }
    console.log(nOptions);
    if(!targetData){
      console.error('timestamp数据格式有问题');
      return nOptions;
    }
     // 分段
    // let count = 1;
    // const COUNT_PER = ((targetData.length / COUNT_DURATION) | 0) + 1;
    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据
      for(let i = 0 ; i < len; i++){
        const data = v[nOptions.data.datasets[i].key];
        if(data) {
          if(nOptions.data.datasets[i].key === 'systolic') {
            if(data < SYS_MIN || data > SYS_MAX) {
              nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
              nOptions.data.datasets[i].pointBorderColor.push(errorColor);
              nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
            }else {
              nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
              nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
              nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
            }
          }else if(nOptions.data.datasets[i].key === 'diastolic'){
            if(data < DIA_MIN || data > DIA_MAX) {
              nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
              nOptions.data.datasets[i].pointBorderColor.push(errorColor);
              nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
            }else {
              nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
              nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
              nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
            }
          }
          // @ts-ignore
          nOptions.data.datasets[i].data.push(data);
        }
      }
      // 填充x轴
      if(isHistory){
        // if(count === COUNT_PER){
          // @ts-ignore
          nOptions.data.labels.push(v.timestamp.slice(5,10));
        //   count = 1;
        // }else {
        //   nOptions.data.labels.push(" ");
        //   count++;
        // }
      }else{
        nOptions.data.labels.push(v.timestamp.slice(11, 16));
      }
      
    });
    return nOptions;
  }


  const newChart = (serviceData: Array<ServiceDataItem>) => {
    try{
      // @ts-ignore
      const ctx = hChart.current.getContext('2d');
      chartH = new Chart(ctx,convertChartData(chartOptions,serviceData, true))
      // @ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      chartT = new Chart(ctx1,convertChartData(chartOptions,serviceData, false))
    }catch(e){

    }
  }
  
  useEffect(() => {
    getBloodPressures({pregnancyId: "207"}).then(res => {
      newChart(res.data);
      setListData(res.data);
    })
  },[]);

  const tab = [
    {title: '历史记录'},
    {title: '当天记录'}
  ]
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
        {listData.map((item: ServiceDataItem) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.header}>
              <div><span>{item.timestamp.slice(0, 10)} -- {item.timestamp.slice(11, 19)}</span></div>
            </div>
            <hr />
            <div className={styles.content}>
              <div><span>收缩压：{item.systolic}</span></div>
              <div>{(item.systolic < SYS_MIN || item.systolic > SYS_MAX) ? <span>异常</span> : <span>正常</span>}</div>
              <div><span>舒张压：{item.diastolic}</span></div>
              <div>{(item.diastolic < DIA_MIN || item.diastolic > DIA_MAX) ? <span>异常</span> : <span>正常</span>}</div>
            </div>
          </div>
        ))}
      </div>  
      <BackButton/>

    </div>
  )
}

export default BloodPressureRecord
