/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:04:22
 * @Description: 体温记录
 */

import React,{ useRef, useState, useEffect } from 'react'
import Chart from 'chart.js';

import { getTemperatures } from '@/services/tools';
import moment from 'moment';
import styles from './Record.less';

interface ServiceDataItem {
  id: number,
  timestamp: string, 
  result: number,
  unit?: null,
  src?: null,
  status?: null,
  pregnancy?: null
}

function ListItem(props) {
  return(
    <div>a</div>
  )
}

function TemperatureRecord() {

  const TemperatureChart = useRef(null);

  const [isHistory, setIsHistory] = useState(true);

  const [listData, setListData] = useState([]);

  let chartOptions = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {key: 'result', label: '体温', fill: false, borderColor: '#FFC0CB', pointBackgroundColor: [], pointBorderColor: [], pointRadius: [], data: []},
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

  // 将服务器数据转换格式插入options中
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, COUNT_DURATION:number = 5) => {
    let count = 0;
    let nOptions = JSON.parse(JSON.stringify(options));
    
    const COUNT_PER = (serviceData.length / COUNT_DURATION) | 0 ;

    const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
    const [ defaultPointRadius, errorPointRadius ] = [2,8];
    if(isHistory) {
      // 历史记录
      serviceData.forEach((v: ServiceDataItem, index: number) => {
        // 填入数据
        const len = nOptions.data.datasets.length;
        if(count === COUNT_PER) {
          count = 0;
        }else {
          for(let i = 0 ; i < len; i++){
            const data = v[nOptions.data.datasets[i].key];
            if(data) {
              if(data > 37){
                nOptions.data.datasets[i].pointBackgroundColor.push(errorColor);
                nOptions.data.datasets[i].pointBorderColor.push(errorColor);
                nOptions.data.datasets[i].pointRadius.push(errorPointRadius);
            }else{
              nOptions.data.datasets[i].pointBackgroundColor.push(defaultColor);
              nOptions.data.datasets[i].pointBorderColor.push(defaultColor);
              nOptions.data.datasets[i].pointRadius.push(defaultPointRadius);
            }
            // @ts-ignore
            nOptions.data.datasets[i].data.push(data);
            }
          }
          nOptions.data.labels.push(v.timestamp.slice(5,10));
          count++;
        }
        
        // 填入时间
        // if(count === COUNT_PER){
        //   count = 0;
        // }else {
        //   nOptions.data.labels.push(" ");
        //   count++;
        // }
      });
    }else{
      // 当天记录
      const todayStr = moment(new Date()).format('YYYY-MM-DD');
      // 过滤当前记录
      const todayDataArr = serviceData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr);
      console.log(todayDataArr);
      // 排序
    }
    
    return nOptions;
  }

  // 离开页面回触发一次， 所有需要加上try catch
  const newChart = (serviceData: Array<ServiceDataItem>) => {
    try{
      //@ts-ignore
      const ctx = TemperatureChart.current.getContext('2d');
      const lineChart = new Chart(ctx, convertChartData(chartOptions,serviceData));
    }catch(e) {
      console.error(e);
    }
  }

  useEffect(()=> {
    getTemperatures({pregnancyId: '207'}).then(res => {
      newChart(res.data);
      console.log(res.data);
      setListData(res.data);
    });
  },['isHistory']);


  console.log(listData);
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>

      </div> */}
      <div className={styles.canvas}>
        <canvas ref={TemperatureChart}></canvas>
      </div>
      <div>
        {listData.map((item: ServiceDataItem) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.header}>
              <div><span>{item.timestamp.slice(0,10)} -- {item.timestamp.slice(11,19)}</span></div>
            </div>
            <hr/>
            <div className={styles.content}>
              <div><span>温度值：{item.result}</span></div>
              <div>{item.result > 37 ? <span>异常</span> : <span>正常值</span>}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemperatureRecord;
