/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-07 18:03:19
 * @Description: 血氧记录
 */

import React,{ useRef, useEffect, useState } from 'react'
import Router from 'umi/router';
import Chart from 'chart.js';
import { Toast, List, Checkbox } from 'antd-mobile';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { getBloodPressures, getRecordNum, GetProp, editBloodPressures } from '@/services/tools';

import { IconFont } from '@/components/antd-mobile';
import styles from '../signs/RecordsTabBar.less';

// const CheckboxItem = Checkbox.CheckboxItem;

/**
 * 数据展示备注
 *  当用户查看历史记录 需要显示最高压和最低压
 */
interface ServiceDataItem {
  timestamp:string, systolic: number, diastolic: number, pulserate: number,
  map?: number,
  id:number,
  pregnancy?: {
    id: number
  },
  status:number
}

const SYS_MAX=139,
SYS_MIN=90,
DIA_MAX=89,
DIA_MIN=50;

const [ defaultColor, errorColor ] = ['#c3c5c6','#dc143c'];
const [ defaultPointRadius, errorPointRadius ] = [2,8];

function BloodPressureRecord(props: {userid: number}) {
  const hChart=useRef(null),tChart=useRef(null);
  const [listData,setListData] = useState([]);
  const [isHistory, setIsHistory] = useState(true);

  // const [visible,setVisible] = useState(false);
  // const [selection, setSelection] = useState([]);
  
  // chart 配置
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
            display: true,
            labelString: '测量值',
            fontSize:20
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

  // 将日历按周期展示
  const convertChartData = (options: any,  serviceData: Array<ServiceDataItem>, isHistory: boolean) => {
    let nOptions = JSON.parse(JSON.stringify(options));  
    // 定义YYYY-MM-DD日期
    const todayStr = moment(new Date()).format('YYYY-MM-DD');
    // 排序
    let targetData:Array<ServiceDataItem> = [];
    serviceData.forEach(v => targetData.push(v));
    // 对显示数据进行过滤
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
      targetData = targetData.filter((v: ServiceDataItem) => moment(v.timestamp).format('YYYY-MM-DD') === todayStr);
    }

    const len = nOptions.data.datasets.length;
    targetData.forEach((v: ServiceDataItem, index: number) => {
      // 填入数据/样式
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
  
  const toEdit = (item: ServiceDataItem) => {
    Router.push(`/signs/blood-pressure/input?timestamp=${item.timestamp}&systolic=${item.systolic}&diastolic=${item.diastolic}&pulserate=${item.pulserate}&id=${item.id}`);
  }


  // const renderList = (errData: Array<ServiceDataItem>) => (
  //   <List> 
  //     {errData.map((v:ServiceDataItem) => (
  //     <CheckboxItem key={v.id}
  //       onChange={(e:any) => handleCheckBoxChange(e, v.id)}
  //     >
  //       {`${v.timestamp.slice(5,10)}/${v.timestamp.slice(11,16)}  血压：${v.systolic}/${v.diastolic}`}
  //     </CheckboxItem>
  //   ))}
  //   </List>
  // )

  // const handleCheckBoxChange = (e:any, id:number) => {
  //   if(e.target.checked){
  //     setSelection(selection => {
  //       //@ts-ignore
  //       selection.push(id);
  //       return selection;
  //     });
  //   }else{
  //     const i = selection.findIndex((v:number) => v === id);
  //     setSelection(selection => {
  //       selection.splice(i,1);
  //       return selection;
  //     });
  //   }
  // }
  
  // const handleConfirm = () => {
  //   for(let i = 0 ;i < selection.length ; i++){
  //     let t:ServiceDataItem|false = listData.find((v:ServiceDataItem) => v.id === selection[i]) || false;
  //     if(t){
  //       // @ts-ignore
  //       t.status = 0; 
  //       editBloodPressures(t).then(res => console.log(res));
  //     }
  //   }
  // }

  // 请求
  useEffect(() => {
    const { search } = window.location;
    if(/blood-pressure/.test(search)){
      getRecordNum({type: 'blood-pressures',pregnancyId: props.userid}).then(res => {
        if(res.data !== 0){
          const reqData:GetProp = {pregnancyId: props.userid,page:0,size: Number(res.data), sort:'timestamp'};
          getBloodPressures(reqData).then(res => setListData(res.data))
        }else{
          Toast.info('暂无数据');
        }
      })
    }
  },[props.userid]);
  // 渲染chart
  useEffect(() => {
    // 离开页面时listData会变为空
    if(listData.length === 0) return;
    // 判断异常数据
    // if(listData.filter((v: ServiceDataItem) => v.status === 1).length !== 0){
    //   setVisible(true);
    // }
    // 过滤已删除的数据
    newChart(listData.filter((v:ServiceDataItem) => v.status !== -1));
  },[listData])

  return (
    <div className={styles.container}>
      <div className={styles['canvas-block']}>
        <div onClick={() => setIsHistory(isHistory => !isHistory)} className={styles.switch}>
          {isHistory ? <span>历史记录</span> : <span>今日记录</span>}
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
        {listData.map((item: ServiceDataItem) => (
          <div className={styles.card} key={item.id} onClick={() => toEdit(item)}>
            <div className={styles.header}>
              <div className={styles.src}>
                <IconFont type="fetus"/><span>录入</span>
              </div>
              <div className={styles.date}>
                <span>{item.timestamp.slice(0, 10)}/{item.timestamp.slice(11, 19)}</span>
                </div>
            </div>
            <div className={styles.content}>
              <div>
                <div><span>血压</span></div>
                <div><span>{item.systolic}/{item.diastolic}</span></div>
                <div>{(item.systolic < SYS_MIN || item.systolic > SYS_MAX) ? <span className={styles['err-text']}>异常</span> : <span>正常</span>}</div>
              </div>
              <div>
                <div><span>脉率</span></div>
                <div><span>{item.pulserate}</span></div>
                <div>正常</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Modal
        visible={visible}
        transparent
        title="异常数据"
        style={{width: '100%', height: 'auto'}}
      > 
        <div>
          {renderList(listData.filter((v:ServiceDataItem) => v.status === 1))}
          <div>
            <Button onClick={handleConfirm}>确定</Button>
          </div>
        </div>
      </Modal>    */}
      <BackButton/>
    </div>
  )
}

export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(BloodPressureRecord);
