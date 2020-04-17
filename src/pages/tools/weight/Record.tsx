/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:56
 * @Description: 体重记录
 * chart.js参考https://www.chartjs.org/docs/latest/charts/line.html
 */

import React, { useRef, useState, useEffect } from 'react';
// import Router from 'umi/router';
import Chart from 'chart.js';
import { connect } from 'dva';
import Router from 'umi/router';
import { ConnectState } from '@models/connect';
import moment from 'moment';
import { IconFont } from '@/components/antd-mobile';
import { getWeight, getRecordNum, GetProp } from '@/services/tools';
// import { Range } from '@/pages/tools/signs/config';

import styles from '../signs/RecordsTabBar.less';

const nowTimeStamp = Date.now();

interface ServiceDataItem {
  timestamp:string,
  result: number,
  map?: number,
  id:number,
  pregnancy?: {
    id: number
  },
  status:number,
  src?:number
}

const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
const [ defaultPointRadius, errorPointRadius ] = [4,8];

const todayStr = moment(new Date()).format('YYYY-MM-DD');

// chart 配置
const chartOptions = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {key: 'result',label: '体重',fill: false,borderColor: '#f5bff0', borderWidth: 8,pointBackgroundColor: [], pointBorderColor: [],pointRadius: [],data: []}
    ]
  },
  options: {
    responsive: true,
    steppedLine: true,
    legend: {
      labels: {
        fontSize: 15,
        fontColor: '#000000'
      }
    },
    title: {
      display: true,
      fontSize: 28,
      fontColor: '#000000',
      FontFamily: 'Arial',
      text: '体重曲线'
    },
    layout: {padding: {top: 0,left: 10,right: 10,bottom :10}},
    tooltips: {
      mode: 'index',
      intersect: false,
      titleFontSize: 20,
      bodyFontSize: 20
    },
    scales: {
      xAxes: [{
        ticks: {
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
          display: false
        },
        ticks: {
          max: 150,
          min: 45,
          stepSize: 15,
          fontSize: 20,
          autoSkip: true
        }
      }]
    }
  }
};


function WeightRecord(props: {userid: number}) {

  const hChart=useRef(null),tChart=useRef(null);

  const [listData, setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);


  const toEdit = (item: ServiceDataItem) => {
    Router.push(`/signs/weight/input?timestamp=${item.timestamp}&result=${item.result}&id=${item.id}`);
  }

  const renderList = (listData: Array<ServiceDataItem>, isHistory: boolean) => {
    if(!isHistory){
      listData = listData.filter((v:ServiceDataItem) => v.timestamp.slice(0,10) == todayStr);
    }
    return (
      listData.map((item: ServiceDataItem) => (
        <div className={styles.card} key={item.id}>
          <div className={styles.header}>
            {item.src === 1 ? (
              <div className={styles.src}>
                <IconFont type="synchronization"/><span>同步</span>
              </div>
            ) : (
              <div className={styles.src} onClick={() => toEdit(item)}>
                <IconFont type="edite"/><span>录入</span>
              </div>
            )}
            <div className={styles.date}>
              <span>{item.timestamp.slice(0,10)}</span>
            </div>
          </div>
          <div className={styles.content}>
            <div>
              <div><span>体重</span></div>
              <div><span>{item.result}&nbsp; kg</span></div>
            </div>
          </div>
        </div>
      ))
    )
  }

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, isHistory: boolean) => {
    let nOptions = JSON.parse(JSON.stringify(options));

    // 排序
    let targetData:Array<ServiceDataItem> = [];
    serviceData.forEach(v => targetData.push(v));
    // 对显示数据进行过滤
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
      targetData = targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr);
    }
    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem, index: number) => {
      for(let i = 0 ; i < len; i++){
        const data = v[nOptions.data.datasets[i].key];
        if(data) {
          // 注入样式
          // if(data < min || data > max) {
          //   nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
          //   nOptions.data.datasets[i].pointBorderColor.push(errorColor);
          //   nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
          // }else {
            nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
            nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
            nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
          // }
          // 注入数据
          nOptions.data.datasets[i].data.push(data);
        }
      }
      // 填充x轴
      if(isHistory){
        nOptions.data.labels.push(v.timestamp.slice(5,10));
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
      let chartH = new Chart(ctx,convertChartData(chartOptions,serviceData, true))
      // @ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      let chartT = new Chart(ctx1,convertChartData(chartOptions,serviceData, false))
    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    const reqData:GetProp = {pregnancyId: props.userid,page:0,size: 40, sort:'timestamp'};
    getWeight(reqData).then(res => setListData(res.data.reverse()));
  },[props.userid])

  useEffect(() => {
    // listData 改变 重新渲染表单
    if(listData.length !== 0){
      newChart(listData.filter((v:ServiceDataItem) => v.status !== -1).reverse());
    }
  }, [listData])

  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
        <div className={styles.switch}>
          <div className={styles.title}>
            {isHistory ? <span>历史体重曲线</span> : <span>今日体重曲线</span>}
            <small>(单位:kg)</small>
          </div>
          <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.text}>
            <IconFont type="record" size="0.25rem"/>
            {isHistory ? <span>今日记录</span> : <span>历史记录</span>}
          </div>
        </div>
        <div className={styles.canvas} style={{display: isHistory ? "block" : "none"}}>
          <canvas ref={hChart}/>
        </div>
        <div className={styles.canvas} style={{display: isHistory ? "none" : "block"}}>
          <canvas ref={tChart}/>
        </div>
      </div>
      <div className={styles.count}>
        <div>
          <span>记录列表</span>
        </div>
        <div>
          <span>共{listData.filter((item: ServiceDataItem) => item.status !== -1).length}条</span>
          </div>
      </div>
      <div className={styles.list}>
        {listData.length !== 0 ? (
          renderList(listData, isHistory)
        ) : (
          <div>无历史记录数据</div>
        )}
      </div>
    </div>
  );
}

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(WeightRecord)
