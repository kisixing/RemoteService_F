/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:02:18
 * @Description: 血氧记录
 */

import React, { useState, useEffect, useRef } from 'react'
import Router from 'umi/router';
import Chart from 'chart.js';
import { connect } from 'dva';
import { getBloodOxygens, getRecordNum, GetProp } from '@/services/tools';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { IconFont } from '@/components/antd-mobile';
import { Range } from '@/pages/tools/signs/config';
import { arrFill } from '../signs/utils';
import styles from '../signs/RecordsTabBar.less';
interface ServiceDataItem {
  timestamp: string,
  id: number,
  result: number,
  pregnancy: {
    id: number
  },
  pulserate: number,
  status: number,
  src?: number
}

const { NORMAL_MIN, NORMAL_MAX } = Range.bloodOxygen;
const { PULSE_MIN, PULSE_MAX } = Range.pulserate;
const [defaultColor, errorColor] = ['#c3c5c6', '#dc143c'];
const [defaultPointRadius, errorPointRadius] = [4, 8];
// 定义标准日期
const todayStr = moment(new Date()).format('YYYY-MM-DD');
const chartOptions = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { key: 'result', label: '血氧', fill: false, borderColor: '#DDA0DD',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: 'pulserate', label: '脉率', fill: false, borderColor: '#7CFC00',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] }
    ]
  },
  options: {
    responsive: true,
    steppedLine: true,
    legand: {
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
          display: false,
          // labelString: '',
          // fontSize: 20
        },
        ticks: {
          // 幅度
          max: 100,
          min: 50,
          stepSize: 10,
          // style
          fontSize: 20,
          fontWeight: 500
        }
      }],
    }
  }
}

function BloodOxygenRecord(props: {userid: number}) {

  const hChart = useRef(null);
  const tChart = useRef(null);



  const [listData, setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);

  

  // 将日历按周期展示
  const convertChartData = (options: any, serviceData: Array<ServiceDataItem>, isHistory: boolean) => {
    let nOptions = JSON.parse(JSON.stringify(options));
    // 深拷贝
    let targetData:Array<ServiceDataItem> = serviceData.map(v=>v);
    if(isHistory){
      // 考虑抽这个fun出来
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
      targetData = targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr),"timestamp";
    }
    targetData = arrFill<ServiceDataItem>(targetData, 'result');
    targetData = arrFill<ServiceDataItem>(targetData, 'pulserate');

    // 显示的线段数量
    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem) => {
      // 填入数据
      for (let i = 0; i < len; i++) {
        const data = v[nOptions.data.datasets[i].key];
        if(data) {
          let min,max;
          switch(nOptions.data.datasets[i].key){
            case 'result':
              min = NORMAL_MIN; max = NORMAL_MAX;
              break;
            case 'pulserate':
              min = PULSE_MIN; max = PULSE_MAX;
              break;
            default:
              min = 0; max = 0;
              break;
          }
          if(min === 0 && max === 0) {
            continue;
          }
          if (data < min || data > max) {
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
        nOptions.data.labels.push(v.timestamp.slice(5, 10));
      }else{
        nOptions.data.labels.push(v.timestamp.slice(11, 16));
      }
    });
    return nOptions;
  }

  const newChart = (serviceData: Array<ServiceDataItem>) => {
    try {
      // @ts-ignore
      const ctx = hChart.current.getContext('2d');
      let chartH = new Chart(ctx, convertChartData(chartOptions, serviceData, true));
      // @ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      let chartT = new Chart(ctx1, convertChartData(chartOptions, serviceData, false));
    } catch (e) {

    }
  }

  const toEdit = (item: ServiceDataItem) => {
    Router.push(`/signs/blood-oxygen/input?timestamp=${item.timestamp}&result=${item.result}&pulserate=${item.pulserate}&id=${item.id}`);
  }

  useEffect(() => {
    getRecordNum({type: 'blood-oxygens', pregnancyId: props.userid}).then(res => {
      if(res.data !== 0){
        const reqData:GetProp = {pregnancyId: props.userid,page:0,size: Number(res.data), sort:'timestamp'};
        // 逆序
        getBloodOxygens(reqData).then(res => setListData(res.data.reverse()));
      }else{
        newChart([]);
      }
    })
  }, []);
  useEffect(() => {
    if(listData.length !== 0){
      newChart(listData.filter((v:ServiceDataItem) => v.status !== -1).reverse());
    }
  },[listData])

  const renderList = (listData: Array<ServiceDataItem>, isHistory: boolean) => {
    if(!isHistory){
      listData = listData.filter((v:ServiceDataItem) => v.timestamp.slice(0,10) == todayStr);
    }
    return(
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
              <span>{item.timestamp.slice(0, 10)}</span>
              </div>
          </div>
          <div className={styles.content}>
            <div>
              <div><span>血氧值</span></div>
              <div><span>{item.result}%</span></div>
              <div>{item.result < NORMAL_MIN || item.result > NORMAL_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}</div>
            </div>
            {item.pulserate ? (
              <div>
                <div><span>脉率</span></div>
                <div><span>{item.pulserate}</span></div>
                <div>{item.pulserate < PULSE_MIN || item.pulserate > PULSE_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}</div>
              </div>
            ) : null}
          </div>
        </div>
      ))
    )
  };

  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
        <div  className={styles.switch}>
          <div className={styles.title}>
            {isHistory ? <span>历史血氧曲线</span> : <span>今日血氧曲线</span>}
            <small>(单位:%)</small>
          </div>
          <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.text}>
            <IconFont type="record" size="0.25rem" />
            {isHistory ? <span>今日记录</span> : <span>历史记录</span>}
          </div>
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
}))(BloodOxygenRecord)
