/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:04:22
 * @Description: 体温记录
 */

import React, { useRef, useState, useEffect } from 'react'
import Router from 'umi/router';
import Chart from 'chart.js';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { getTemperatures, getRecordNum, GetProp } from '@/services/tools';
import moment from 'moment';
import { IconFont } from '@/components/antd-mobile';
import { Range } from '@/pages/tools/signs/config';
import RecordCard from '../components/RecordCard';

import styles from '../signs/RecordsTabBar.less';



interface ServiceDataItem {
  id: number,
  timestamp: string,
  result: number,
  pregnancy: {
    id: number
  },
  status:number,
  src?:number
}

const { NORMAL_MAX, NORMAL_MIN } = Range.temperature;

// 异常与正常样式
const [defaultColor, errorColor] = ['#c3c5c6', '#dc143c'];
const [defaultPointRadius, errorPointRadius] = [4, 8];

// 定义标准YYYY-MM-DD字符串
const todayStr = moment(new Date()).format('YYYY-MM-DD');

const chartOptions = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { key: 'result', label: '体温', fill: false, borderColor: '#FFC0CB',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
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
        // tension: 0.4
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
          display: false,
          // labelString: '体温(℃)',
          // fontSize: 20
        },
        ticks: {
          // 幅度
          max: 39,
          min: 35,
          stepSize: 1,
          // style
          fontSize: 20,
          fontWeight: 500
        }
      }],
    }
  }
}

function TemperatureRecord(props: {userid: number}) {

  const [hChart, tChart] = [useRef(null), useRef(null)];
  // 历史记录chart，todayChart
  const [listData, setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);
  
  // 将服务器数据转换格式插入options中
  const convertChartData = (options: any, serviceData: Array<ServiceDataItem>, isHistory: boolean, COUNT_DURATION: number = 5) => {
    // 这个性能的消耗会不会有点多，考虑是否直接清空options
    let nOptions = JSON.parse(JSON.stringify(options));
    // 深拷贝
    let targetData:Array<ServiceDataItem>|false = serviceData.map(v=>v)
    if(!targetData) return ;
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
      targetData = targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr);
    } 
    if(!targetData){
      console.error('timestamp数据格式有问题');
      return nOptions;
    }

    // 显示的线段数量
    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem) => {
      for (let i = 0; i < len; i++) {
        const data = v[nOptions.data.datasets[i].key];
        if (data) {
          // 只有体温一个值 不抽离
          // 样式注入
          if (data > NORMAL_MAX || data < NORMAL_MIN) {
            nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
            nOptions.data.datasets[i].pointBorderColor.push(errorColor);
            nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
          } else {
            nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
            nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
            nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
          }
          // 数据注入
          nOptions.data.datasets[i].data.push(data);
        }
      }
      // x轴坐标注入
      if(isHistory){
        nOptions.data.labels.push(v.timestamp.slice(5, 10)); 
      }else{
        nOptions.data.labels.push(v.timestamp.slice(11, 16));
      }
    });
    return nOptions;  
  }

  // 离开页面回触发一次， 所有需要加上try catch
  const newChart = (serviceData: Array<ServiceDataItem>) => {
    try {
      //@ts-ignore
      const ctx = hChart.current.getContext('2d');
      let chartH = new Chart(ctx, convertChartData(chartOptions, serviceData, true));
      //@ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      let chartT = new Chart(ctx1, convertChartData(chartOptions, serviceData, false));
    } catch (e) {
      console.error(e);
    }
  }

  const toEdit = (item:ServiceDataItem) => {
    Router.push(`/signs/temperature/input?timestamp=${item.timestamp}&result=${item.result}&id=${item.id}`);
  }

  useEffect(() => {
    getRecordNum({type: 'temperatures', pregnancyId: props.userid}).then(res => {
      if(res.data!==0){
        const reqData:GetProp = {pregnancyId: props.userid,page:0,size: Number(res.data), sort:'timestamp'};
        getTemperatures(reqData).then(res => {
          newChart(res.data);
          setListData(res.data.reverse());
        });
      }else{
        newChart([]);
      }
    })
  },[]);
  useEffect(() => {
    if(listData.length !== 0) {
      newChart(listData.reverse());
    }
  },[listData])


  const renderList = (listData: Array<ServiceDataItem>, isHistory:boolean) => {
    if(!isHistory){
      listData = listData.filter((v:ServiceDataItem) => v.timestamp.slice(0,10) == todayStr);
    }

    const title = (item: ServiceDataItem) => {
      if(item.src === 1){
        return (
          <span>
            <IconFont type="synchronization"/><span>同步</span>
          </span>
        )
      }else{
        return (
          <span onClick={() => toEdit(item)}>
            <IconFont type="edite"/><span>录入</span>
          </span>
        )
      }
    }
    const contents = [
      {name: '体温', key: 'result',unit: '℃', max: NORMAL_MAX, min: NORMAL_MIN, normalText: <span>正常</span>, errorText: <span style={{color: 'red'}}>异常</span>}
    ]
    return (
      listData.map((item: ServiceDataItem) => (
        <RecordCard
          key={item.id}
          title={title(item)}
          titleExact={item.timestamp.slice(0, 10)}
          contents={contents}
          dataSource={item}
        />
      ))
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
        <div  className={styles.switch}>
          <div className={styles.title}>
            {isHistory ? <span>历史体温曲线</span> : <span>今日体温曲线</span>}
            <small>(单位:℃)</small>
          </div>
          <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.text}>
            <IconFont type="record" size="0.25rem" />
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
  )
}

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(TemperatureRecord);
