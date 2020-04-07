import React, { useState, useRef, useEffect } from 'react';

interface CircleProgressProps {
  strokeColor?: string;
  width: number;
  height: number;
  gapDegree: number;
  // 顺时针旋转为正
  rotate: number;
  // 颜色百分比
  percent: number;
  textArray: Array<string>
}

const PI = Math.PI;

export default function CircleProgress(props: CircleProgressProps) {

  const cp = useRef(null);
  // 本地存储props用于比较做动画
  const [np,setNp] = useState(props);

  const percentValid = (percent:number):number => {
    if(percent > 100){
      return 100;
    }else if(percent < 0){
      return 0;
    }
    return percent;
  }


  const update = (props: CircleProgressProps):void => {
    const { width, height, rotate = 0, gapDegree, strokeColor ="", percent, textArray } = props;
    // @ts-ignore
    const ctx = cp.current.getContext('2d');
    // ctx.clearRect(0,0,width, height);
    // // arc(x, y, radius, startAngle, endAngle, <anticlockwise>)
    const radius = width > height ? height/2 - 15 : width/2 - 15;
    // // 这个位置需要将gapDegree转为弧度 startAngle于endAngle左端
    const startAngle = 0.5 * PI + (gapDegree/2)/360*2*PI + rotate/360*PI;
    const endAngle = 0.5 * PI - (gapDegree/2)/360*2*PI + rotate/360*PI;
    // // 第一段底部曲线 -- 这个考虑只画一次
    ctx.beginPath();  
    ctx.strokeStyle = '#eee';
    ctx.arc(width/2, height/2, radius, startAngle , endAngle);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // // 渲染文字
    const lineRadian = 2*PI-startAngle+endAngle;
    for(let i = 0 ; i < textArray.length; i++){
      // js 的三角函数接收弧度
      const currentRadian = lineRadian/(textArray.length-1) * i + startAngle;
      const cX = (radius-35) * Math.cos(currentRadian) + width/2;
      const cY = (radius-35) * Math.sin(currentRadian) + height/2;
      ctx.font = "30px Arial";
      ctx.fillStyle = "#C8C8C8";
      ctx.textAlign = "center";
      ctx.fillText(textArray[i],cX,cY);
    }
    
    // ctx.clearRect(0,0,width,height);
    // 百分比 - start不变 变后面的那一段
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    const preEndAngle = lineRadian/100* (percentValid(percent)) + startAngle;
    ctx.arc(width/2, height/2, radius, startAngle , preEndAngle);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();
    // 绘制完成 
    setNp(props);
  }
  
  useEffect(() => {
    let nowNP = Object.assign({}, np);
    let a = 0;
    const dis = (props.percent-np.percent)/100;
    let s = setInterval(() => {
      if(a===100){
        clearInterval(s);
      }
      a++;
      nowNP.percent += dis;
      update(nowNP);
    }, 5)
    return () => {
      clearInterval(s)
    }
  }, [props])

  return (
    <div>
      <canvas
        ref={cp}
        width={props.width}
        height={props.height}
      />
    </div>
  )
} 
