/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:00:52
 * @Description: 血糖记录
 */

import React, { useRef, useState, useEffect } from 'react';
import Router from 'umi/router';
import Chart from 'chart.js';
import { IconFont } from '@/components/antd-mobile';
import { PERIOD_CODE } from './config';
import { getBloodGlucose, getRecordNum, GetProp } from '@/services/tools';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect'
import moment from 'moment';
import { Range } from '@/pages/tools/signs/config';

import styles from '../signs/RecordsTabBar.less';



interface ServiceDataItem {
  id: number,
  timestamp: string,
  result: number,
  period: PERIOD_CODE,
  pregnancyId: {
    id: number
  },
  status: number,
  insulin: boolean | null
  insulinnote: string | null,
  exercise?: string,
  diet?: string,
  src?:number,
  // 用于列表的渲染，仅在前端展示
  children?: Array<any>
}

const { EMPTY_MIN, EMPTY_MAX, EATING_MIN, EATING_MAX } = Range.bloodGlucose;
const PERIOD_TEXT = ['空腹', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前'];
const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
const [ defaultPointRadius, errorPointRadius ] = [4,8];

const todayStr = moment(new Date()).format('YYYY-MM-DD');

// 历史options
const hChartOptions = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { key: PERIOD_CODE.FASTING, label: '空腹', fill: false, borderColor: '#FFC0CB',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.AFTER_B, label: '早餐后', fill: false, borderColor: '#DDA0DD',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.BEFORE_L, label: '午餐前', fill: false, borderColor: '#6495ED',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.AFTER_L, label: '午餐后', fill: false, borderColor: '#48D1CC',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.BEFORE_D, label: '晚餐前', fill: false, borderColor: '#FFFF00',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.AFTER_D, label: '晚餐后', fill: false, borderColor: '#FF4500',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
      { key: PERIOD_CODE.BEFORE_S, label: '睡前', fill: false, borderColor: '#C0C0C0',borderWidth: 8, pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: [] },
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
      text: ''
    },
    layout: {
      padding: {
        top: 0,
        left: 10,
        right: 10,
        bottom: 10
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
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: false,
          // labelString: '',
          // fontSize: 16
        },
        ticks: {
          // 幅度
          max: 11,
          min: 2,
          stepSize: 1,
          // style
          fontSize: 16
        }
      }],
    }
  }
}
// 当日options
const tChartOptions = {
  type: 'bar',
  data: {
    labels: PERIOD_TEXT,
    datasets: [{
      label: '今日记录',
      backgroundColor: ['#FFC0CB', '#DDA0DD', '#6495ED', '#48D1CC', '#FFFF00', '#FF4500', '#C0C0C0'],
      data: []
    }]
  },
  options: {
    responsive: true,
    steppedLine: true,
    scales: {
      yAxes: [{
        ticks: {
          // 幅度
          max: 9,
          min: 2,
          stepSize: 1,
          fontSize: 16,
        }
      }]
    }
  }
}

function BloodGlucoseRecord(props: { userid: number }) {

  const hChart = useRef(null), tChart = useRef(null);

  const [listData, setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);

  // 展示历史数据
  const convertHChartData = (options: any, serviceData: Array<ServiceDataItem>) => {
    let nOptions = JSON.parse(JSON.stringify(options));
    let labels = new Set(serviceData.map(v => v.timestamp.slice(0, 10)));
    let targetData: Array<ServiceDataItem> | false = serviceData.map((v: any) => v);
    if (!targetData || !labels) return;
    labels.forEach((v: string) => nOptions.data.labels.push(v.slice(5, 10)));
    for (let i = 0; i < targetData.length; i++) {
      for (let j = 0; j < nOptions.data.datasets.length; j++) {
        // 判断period
        let min:number,max:number;
        if(j === PERIOD_CODE.AFTER_B || j === PERIOD_CODE.AFTER_L || j === PERIOD_CODE.AFTER_D){
          min = EATING_MIN;max = EATING_MAX;
        }else{
          min = EMPTY_MIN;max = EMPTY_MAX;
        }
        if (targetData[i].period === nOptions.data.datasets[j].key) {
          for (let k = 0; k < nOptions.data.labels.length; k++) {
            // 对应日期的位置
            if (targetData[i].timestamp.slice(5, 10) === nOptions.data.labels[k]) {
              nOptions.data.datasets[j].data[k] = serviceData[i].result;
              if(targetData[i].result < min || targetData[i].result > max){
                nOptions.data.datasets[j].pointBackgroundColor[k] = errorColor;
                nOptions.data.datasets[j].pointBorderColor[k] = errorColor;
                nOptions.data.datasets[j].pointRadius[k] = errorPointRadius;
              }else{
                nOptions.data.datasets[j].pointBackgroundColor[k] = defaultColor;
                nOptions.data.datasets[j].pointBorderColor[k] = defaultColor;
                nOptions.data.datasets[j].pointRadius[k] = defaultPointRadius;
              }
            }
          }
        }
      }
    }
    console.log(nOptions)
    return nOptions;
  }
  // 展示当天数据
  const convertTChartData = (options: any, serviceData: Array<ServiceDataItem>) => {
    let nOptions = JSON.parse(JSON.stringify(options));
    // 筛选今日值
    let targetData: Array<ServiceDataItem> = serviceData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr);
    for (let i = 0; i < targetData.length; i++) {
      nOptions.data.datasets[0].data[targetData[i].period] = targetData[i].result;
    }
    return nOptions;
  }

  const newChart = (data: Array<ServiceDataItem>) => {
    try {
      //@ts-ignore
      const ctx = hChart.current.getContext('2d');
      let chartH = new Chart(ctx, convertHChartData(hChartOptions, data.reverse()));
      //@ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      let chartT = new Chart(ctx1, convertTChartData(tChartOptions, data.reverse()));
    } catch (e) {
      console.error(e);
    }
  }

  const toEdit = (item: ServiceDataItem) => {
    Router.push(`/signs/blood-glucose/input?timestamp=${item.timestamp}&result=${item.result}&period=${item.period}&exercise=${item.exercise}&diet=${item.diet}&insulin=${item.insulin}&insulinnote=${item.insulinnote}&id=${item.id}`);
  }

  useEffect(() => {
    getRecordNum({ type: 'blood-glucoses', pregnancyId: props.userid }).then(res => {
      if (res.data !== 0) {
        const reqData: GetProp = { pregnancyId: props.userid, page: 0, size: Number(res.data), sort: 'timestamp' };
        getBloodGlucose(reqData).then(res => {
          setListData(res.data.map((v:ServiceDataItem) => {
            v.result = Number(v.result.toFixed(1));
            return v;
          }).reverse());
        })
      } else {
        newChart([]);
      }
    })
  }, [props.userid]);
  useEffect(() => {
    if (listData.length !== 0) {
      newChart(listData);
    }
  }, [listData])

  const renderList = (listData: Array<ServiceDataItem>, isHistory: boolean) => {
    // 转换展示格式
    if(!isHistory){
      listData = listData.filter((v:ServiceDataItem) => v.timestamp.slice(0,10) == todayStr);
    }
    let tarData:Array<any> = [];
    for(let i = 0; i < listData.length; i++) {
      let isFind = false;
      for(let j = 0 ; j < tarData.length ; j++){
        if(listData[i].timestamp.slice(0,10) === tarData[j].timestamp.slice(0,10)){
          tarData[j].children.push({result: listData[i].result, period: listData[i].period});
          isFind = true;
        }
      }
      if(!isFind){
        listData[i].children = [{result: listData[i].result, period: listData[i].period}];
        tarData.push(listData[i]);
      }
    }
    return (
      tarData.map((item: ServiceDataItem) => (
        <div className={styles.card} key={item.id} >
          <div className={styles.header}>
            {item.src === 1 ? (
              <div className={styles.src} onClick={() => toEdit(item)}>
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
            {
            // @ts-ignore
            item.children.map((v,index) => (
              <div key={index}>
                <div className={styles.period}><span>{PERIOD_TEXT[v.period]}</span></div>
                <div><span>{v.result} mmol/L</span></div>
                <div>
                  {item.period === PERIOD_CODE.FASTING || item.period === PERIOD_CODE.BEFORE_S ? (
                    <div>
                      {item.result < EMPTY_MIN || item.result > EMPTY_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}
                    </div>
                  ) : (
                      <div>
                        {item.result < EATING_MIN || item.result > EATING_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}
                      </div>
                    )}
                </div>
              </div>
            ))}
            {/* <div>
              <div><span>血糖</span></div>
              
              <div>
                {item.period === PERIOD_CODE.FASTING || item.period === PERIOD_CODE.BEFORE_S ? (
                  <div>
                    {item.result < EMPTY_MIN || item.result > EMPTY_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}
                  </div>
                ) : (
                    <div>
                      {item.result < EATING_MIN || item.result > EATING_MAX ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}
                    </div>
                  )}
              </div>
            </div> */}
            {/* <div>
              <div><span>胰岛素</span></div>
              <div>{item.insulin ? <span>已注射</span> : <span>未注射</span>}</div>
              <div>{item.insulinnote ? <span>{item.insulinnote}U</span> : <span>无</span>}</div>
            </div>
            <div>
              <div><span>运动情况</span></div>
              <div>{item.exercise ? <span>{item.exercise}</span> : <span>暂无</span> }</div>
            </div>
            <div>
              <div><span>饮食情况</span></div>
              <div>{item.diet ? <span>{item.diet}</span> : <span>暂无</span> }</div>
            </div> */}
          </div>
        </div>
      ))
    )
  };

  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
        <div className={styles.switch}>
        <div className={styles.title}>
            {isHistory ? <span>历史血糖曲线</span> : <span>今日血糖曲线</span>}
            <small>(单位:mmol/L)</small>
          </div>
          <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.text}>
            <IconFont type="record" size="0.25rem" />
            {isHistory ? <span>今日记录</span> : <span>历史记录</span>}
          </div>
        </div>
        <div className={styles.canvas} style={{ display: isHistory ? "block" : "none" }}>
          <canvas ref={hChart} />
        </div>
        <div className={styles.canvas} style={{ display: isHistory ? "none" : "block" }}>
          <canvas ref={tChart} />
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

export default connect(({ global }: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(BloodGlucoseRecord);
