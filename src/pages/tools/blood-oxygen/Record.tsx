/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:02:18
 * @Description: 血氧记录
 */

import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js';
import { connect } from 'dva';

import { getBloodOxygens } from '@/services/tools';
import moment from 'moment';
import { sortDate } from '@/utils/utils';
import { Tabs } from 'antd-mobile';
import { ConnectState } from '@/models/connect';

import styles from './Record.less';
interface ServiceDataItem {
  timestamp: string,
  id: number,
  result: number,
  pregnancy: {
    id: number
  }
}

const NORMAL_O:number = 95;

function BloodOxygenRecord(props: {userid: number}) {

  const hChart = useRef(null);
  const tChart = useRef(null);

  let chartH,chartT;

  const [listData, setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);

  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { key: 'result', label: '血氧', fill: false, borderColor: '#DDA0DD', pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] }
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
        text: ""
      },
      layout: {
        padding: {
          top: 0,
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      elements: {
        line: {
          // tension: 0
        }
      },
      tooltips: {
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
          gridLines: {
            display: false
          },
          // 坐标轴
          ticks: {
            fontSize: 20,
            fontWeight: 400,
            autoSkip: true,
            autoSkipPadding: 50
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '测量值',
            fontSize: 20
          },
          ticks: {
            // 幅度
            max: 100,
            min: 85,
            stepSize: 5,
            // style
            fontSize: 20,
            fontWeight: 500
          }
        }],
      }
    }
  }

  // 将日历按周期展示
  const convertChartData = (options: any, serviceData: Array<ServiceDataItem>, isHistory: boolean, COUNT_DURATION: number = 5) => {
    // 
    let nOptions = JSON.parse(JSON.stringify(options));
    // 异常与正常样式
    const [defaultColor, errorColor] = ['#c3c5c6', '#dc143c'];
    const [defaultPointRadius, errorPointRadius] = [2, 8];
    // 定义标准日期
    const todayStr = moment(new Date()).format('YYYY-MM-DD');
    // 排序
    let targetData:Array<ServiceDataItem>|false = sortDate<ServiceDataItem>(serviceData,'timestamp');
    if(!targetData) {
      return;
    }
    if(isHistory){
      // 展示历史数据，将单天最大值保留
      for(let i=0;i<targetData.length;) {
        for(let j=1;i+j<targetData.length;){
          if(targetData[i].timestamp.slice(0,10) === targetData[i+j].timestamp.slice(0,10)){
            if(targetData[i].result < targetData[i+j].result){
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
      // 展示当天数据
      targetData = sortDate<ServiceDataItem>(targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr),"timestamp");
    } 
    if(!targetData){
      console.error('timestamp数据格式有问题');
      return nOptions;
    }
    // 分段
    let count = 1;
    const COUNT_PER = (targetData.length / COUNT_DURATION) | 0 + 1;
    // 显示的线段数量
    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem) => {
      // 填入数据
      for (let i = 0; i < len; i++) {
        const data = v[nOptions.data.datasets[i].key];
        if(data) {
          if (data < NORMAL_O) {
            nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
            nOptions.data.datasets[i].pointBorderColor.push(errorColor);
            nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
          } else {
            nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
            nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
            nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
          }
        }
        nOptions.data.datasets[i].data.push(data);
      }
      // 根据是否为历史记录填充x轴坐标
      if(isHistory){
        if(count === COUNT_PER){
          nOptions.data.labels.push(v.timestamp.slice(5, 10));
          count = 1;
        }else{
          nOptions.data.labels.push(" ");
          count++;
        }
      }else{
        nOptions.data.labels.push(v.timestamp.slice(11, 16));
      }
    });
    console.log(nOptions);
    return nOptions;
  }

  const newChart = (serviceData: Array<ServiceDataItem>) => {
    try {
      // @ts-ignore
      const ctx = hChart.current.getContext('2d');
      chartH = new Chart(ctx, convertChartData(chartOptions, serviceData, true));
      // @ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      chartT = new Chart(ctx1, convertChartData(chartOptions, serviceData, false));
    } catch (e) {

    }
  }

  useEffect(() => {
    getBloodOxygens({ pregnancyId: '207' }).then(res => {
      newChart(res.data);
      setListData(res.data);
    });
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
      <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.switch}>
          {isHistory ? <span>历史记录</span> : <span>今日记录</span>}
        </div>
        <div>
          <div className={styles.canvas} style={{display: isHistory ? "block" : "none"}}>
            <canvas ref={hChart}></canvas>
          </div>
          <div className={styles.canvas} style={{display: isHistory ? "none" : "block"}}>
            <canvas ref={tChart}></canvas>
          </div>
        </div>
      </div>
      <div>
        {listData.map((item: ServiceDataItem) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.header}>
              <div><span>{item.timestamp.slice(0, 10)} -- {item.timestamp.slice(11, 19)}</span></div>
            </div>
            <hr />
            <div className={styles.content}>
              <div><span>血氧值：{item.result}</span></div>
              <div>{item.result < NORMAL_O ? <span>异常</span> : <span>正常</span>}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy.id
}))(BloodOxygenRecord)
