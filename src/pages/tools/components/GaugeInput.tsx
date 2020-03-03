/*
 * @Description: 仪表盘输入组件
 * @Author: Zhong Jun
 * @Date: 2020-03-03 16:04:08
 */

import React from 'react';

import styles from './GaugeInput.less';

interface IProps {
  onChange?: () => void
  min?: number
  max?: number
  id: string
  value?: string
}

function GaugeInput({ onChange, min, max, id, value }: IProps) {
  let canvasRef = React.createRef();

  React.useEffect(() => {
    draw(1.5 * Math.PI);
  }, []);

  const draw = (toAngle: number, currentAngle = Math.PI) => {
    const canvas: any = document.getElementById('canvas');
    const width = canvas.width;
    const height = canvas.height;
    // 圆点
    const x = width / 2;
    const y = height / 2;
    const radius = 150 * window.devicePixelRatio;
    const deg = Math.PI / 7;
    const innerLineW = 28;
    console.log('123-->', window.devicePixelRatio, width, height, x, y);

    const ctx = canvas.getContext('2d');

    ctx.save();
    // 设置线宽
    ctx.lineWidth = innerLineW;
    // 设置描边样式;
    ctx.strokeStyle = '#ffcc4a';
    //路径开始
    ctx.beginPath();
    // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.arc(x, y, radius, 1 * Math.PI, 2 * Math.PI, false);
    // 绘制
    ctx.stroke();
    ctx.closePath(); //路径结束

    // 圆弧
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fe4d55';
    ctx.lineWidth = innerLineW;
    ctx.arc(x, y, radius, Math.PI, currentAngle, false);
    ctx.stroke();
    if (currentAngle < toAngle) {
      currentAngle += toAngle > 1.5 * Math.PI ? 0.04 : 0.02;
      if (currentAngle > toAngle) currentAngle = toAngle;
      requestAnimationFrame(() => {
        draw(toAngle, currentAngle);
      });
    }
  };
  return (
    <div className={styles.container}>
      <canvas id={'canvas'} ref={canvasRef} className={styles.canvas} width="1000" height="1000" />
      <div className={styles.form}>
        <input />
        <span>{window.devicePixelRatio}</span>
      </div>
    </div>
  );
}

export default GaugeInput;
