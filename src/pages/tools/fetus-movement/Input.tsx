import React,{useState} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import DatePicker from '../components/DatePicker';
import { Toast } from 'antd-mobile';
import { IconFont, CountDown } from '@/components/antd-mobile';
import { ConnectState } from '@/models/connect';

import { setFetusMovement, SetProp } from '@/services/tools'; 

import styles from './Input.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const FIVE_MIN = 300 * 1000;

function fixedZero(val: number): string {
  return val * 1 < 10 ? `0${val}` : `${val}`;
}

/**
 *  
 * 
 */
function FetusMovementInput(props: any) {
  let c:any = null;
  
  const [date, setDate] = useState(now);
  const [count,setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [canAddCount, setCanAddCount] = useState(false);
  
  
  const toRecord = () => {
    window.location.href = `/fetusmovement?key=record`;
  }

  // 
  const handleClick = () => {
    if(isCounting){
      if(canAddCount){
        setCount(count => count + 1);
        setCanAddCount(false);
      }else{
        Toast.info("5分钟内有效次数为1次");
      }
    }else{
      c = setInterval(() => {
        setCanAddCount(true);
      },FIVE_MIN);
      setIsCounting(true);
      setCanAddCount(true);
      setDate(new Date());
    }
  }

  const handleEnd = () => { 
    clearInterval(c);
    const d = moment(date).format();
    console.log('end');
    // 这个位置获取一下当前时间取set
    const reqData:SetProp = {
      result: count,
      timestamp: d,
      pregnancy: {id: props.userid}
    }
    setFetusMovement(reqData).then((res:any) => {
      if(!res.data) return;
      Toast.info('胎动数据记录成功');
      setIsCounting(false);
    })
  }

  const reset = () => {
    setIsCounting(false);
    setCount(0);
  }

  // 这个位置做时间格式显示与样式
  const formatTime = (time:number) => {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;
    const second = 1000;
    // 渲染有延时
    const h = Math.floor(time / hours);
    const m = Math.floor((time - h * hours) / minutes)  + h * 60;
    const s = Math.floor((time - m * minutes) / second);
    // 最后这个只需要2位
    const ms = Math.floor((time - m * minutes - s * second) / 10);
    return (
      <div className={styles.clock}>
        <span>{fixedZero(m)}</span>
        :
        <span>{fixedZero(s)}</span>
        :
        <span>{fixedZero(ms)}</span>
      </div>
    );
  }


  const renderBtnContext = ():React.ReactNode => {
    if(isCounting){
      return (
        <div className={styles.counting}>
          <p>
            <span className={styles.count}>{count}</span>
            <span className={styles.unit}>次</span>
          </p>
          <p><span>动一次 点一下</span></p>
        </div>
      )
    }else{
      return (
        <div className={styles.pre}>
          <p><span>开始</span></p>
          <p><IconFont type="refund" size="40px"></IconFont></p>
        </div>
      )
    }
  }
  

  return (
    <div className={styles.container}>
      <DatePicker
        mode="datetime"
        title="选择日期"
        extra="请选择日期"
        value={date}
        onChange={date => setDate(date)}
      />
      <div className={styles.content}>

        <div className={styles.text}>
          <span onClick={toRecord}>历史记录</span>
        </div>

        {/* 组件内和这个位置的时间逻辑分开 */}
        <div>
          <div className={styles.countdown}>
            {isCounting && 
            <CountDown
              interval={90}
              // target={date.getTime() + 3600*1000} // 现在时间+1个小时
              target={date.getTime() + 30 *1000} 
              format={formatTime}
              onEnd={handleEnd}
            />}
          </div>
          
          <button className={styles.circle} onClick={handleClick}>
            {renderBtnContext()}
          </button>
        </div>

        <div className={styles.tips}>
          <p>5分钟内有效次数为1次~</p>
          <p>早中晚各测一次才能推算胎动是否正常哦~</p>
        </div>
              
      </div>
      {
        isCounting ? (
          <div className={styles.refresh} onClick={reset}>
            <IconFont type="synchronization" size=".8rem" color="white"/>
          </div>  
        ): null
      }
    </div>
  )
}


export default connect(({global}: ConnectState) => ({
  userid: global.currentPregnancy?.id
}))(FetusMovementInput)
