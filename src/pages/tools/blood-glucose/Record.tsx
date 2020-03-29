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
  src?:number
}

const { EMPTY_MIN, EMPTY_MAX, EATING_MIN, EATING_MAX } = Range.bloodGlucose;
const PERIOD_TEXT = ['空腹', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前'];
// 历史options
const hChartOptions = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { key: PERIOD_CODE.FASTING, label: '空腹', fill: false, borderColor: '#FFC0CB', pointBackgroundColor: '##C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.AFTER_B, label: '早餐后', fill: false, borderColor: '#DDA0DD', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.BEFORE_L, label: '午餐前', fill: false, borderColor: '#6495ED', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.AFTER_L, label: '午餐后', fill: false, borderColor: '#48D1CC', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.BEFORE_D, label: '晚餐前', fill: false, borderColor: '#FFFF00', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.AFTER_D, label: '晚餐后', fill: false, borderColor: '#FF4500', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
      { key: PERIOD_CODE.BEFORE_S, label: '睡前', fill: false, borderColor: '#C0C0C0', pointBackgroundColor: '#C3C5C6', pointBorderColor: '#C3C5C6', pointRadius: 2, data: [] },
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
          display: true,
          labelString: '测量值',
          fontSize: 16
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
  let chartH, chartT;

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
        if (targetData[i].period === nOptions.data.datasets[j].key) {
          for (let k = 0; k < nOptions.data.labels.length; k++) {
            // 对应日期的位置
            if (targetData[i].timestamp.slice(5, 10) === nOptions.data.labels[k]) {
              nOptions.data.datasets[j].data[k] = serviceData[i].result;
            }
          }
        }
      }
    }
    return nOptions;
  }
  // 展示当天数据
  const convertTChartData = (options: any, serviceData: Array<ServiceDataItem>) => {
    let nOptions = JSON.parse(JSON.stringify(options));

    const todayStr = moment(new Date()).format('YYYY-MM-DD');
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
      chartH = new Chart(ctx, convertHChartData(hChartOptions, data.reverse()));
      //@ts-ignore
      const ctx1 = tChart.current.getContext('2d');
      chartT = new Chart(ctx1, convertTChartData(tChartOptions, data.reverse()));
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

  const renderList = (listData: Array<ServiceDataItem>) => {
    // 转换展示格式
    let tarData:Array<any> = [];
    for(let i = 0; i < listData.length; i++) {
      let isFind = false;
      for(let j = 0 ; j < tarData.length ; j++){
        if(listData[i].timestamp === tarData[j].timestamp){
          tarData[j].children.push({result: listData[i].result, period: listData[i].period});
          isFind = true;
        }
      }
      if(!isFind){
        listData[i].children = [{result: listData[i].result, period: listData[i].period}];
        tarData.push(listData[i]);
      }
      console.log(tarData);
    }
    console.log(tarData);
    return (
      tarData.map((item: ServiceDataItem) => (
        <div className={styles.card} key={item.id} >
          <div className={styles.header}>
            {item.src === 1 ? (
              <div className={styles.src} onClick={() => toEdit(item)}>
                <IconFont type="synchronization" /><span>同步</span>
              </div>
            ) :(
              <div className={styles.src} onClick={() => toEdit(item)}>
                <IconFont type="edite" /><span>录入</span>
              </div>
            )}
            <div className={styles.date}>
              <span>{item.timestamp.slice(0, 10)}/{item.timestamp.slice(11, 19)}</span>
            </div>
          </div>
          <div className={styles.content}>
            {item.children.map((v,index) => (
              <div key={index}>
                <div><span>{PERIOD_TEXT[v.period]}</span></div>
                <div><span>{item.result}</span></div>
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
            {isHistory ? <span>历史记录</span> : <span>今日记录</span>}
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
          renderList(listData)
        ) : (
          <div>暂无数据</div>
        )}
        </div>
    </div>
  )
}

export default connect(({ global }: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(BloodGlucoseRecord);
