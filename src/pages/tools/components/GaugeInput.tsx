/*
 * @Description: 仪表盘输入组件
 * @Author: Zhong Jun
 * @Date: 2020-03-03 16:04:08
 */

import React from 'react';

import styles from './GaugeInput.less';

const Pixel = window.devicePixelRatio;

interface IProps {
  onChange?: () => void
  min?: number
  max?: number
  id: string
  value?: number | string
  suffix?: string
  title?: string
}

function GaugeInput({ onChange, min = 0, max = 100, id, value = Pixel, suffix = "kg", title = "标题" }: IProps) {

  React.useEffect(() => {
    draw(1.5 * Math.PI);
  }, [value]);

  const draw = (toAngle: number, currentAngle = 1 * Math.PI) => {
    const canvas: any = document.getElementById('canvas');
    const width = canvas.width;
    const height = canvas.height;
    // 圆点
    const x = width / 2;
    const y = height / 2;
    const radius = 350;
    const deg = Math.PI / 6;
    const innerLineW = 10;
    // 6等分
    const each = (max - min) / 6;

    const ctx = canvas.getContext('2d');
    ctx.translate(x, y); // 将坐标原点移到画布中心
    // ctx.rotate(-Math.PI); //将坐标轴逆时针旋转90度，x轴正方向对准12点方向

    ctx.beginPath(); // 路径开始
    ctx.lineWidth = innerLineW; // 设置线宽
    ctx.strokeStyle = '#ffcc4a'; // 设置描边样式;
    ctx.arc(0, 0, radius, 1 * Math.PI, 2 * Math.PI, false); // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.stroke(); // 绘制

    ctx.rotate(0.5 * Math.PI);
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.strokeStyle = '#f00';
      ctx.lineWidth = 5;
      ctx.rotate(deg);
      ctx.moveTo(345, 0);
      if (i > 8 || i < 2) {
        ctx.lineTo(345, 0);
      } else {
        ctx.lineTo(365, 0);
      }
      ctx.font = 36 + 'px April';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#666';
      if (i < 7) {
        ctx.fillText(i.toFixed(0), 300, 350 + i);
      } else {
        ctx.fillText('', 0, 0);
      }
      ctx.stroke();
    }

    // 圆弧
    ctx.beginPath();
    ctx.rotate(-0.5 * Math.PI);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fe4d55';
    ctx.lineWidth = 4 * innerLineW;
    ctx.arc(0, 0, radius, Math.PI, currentAngle, false);
    ctx.stroke();
    // if (currentAngle < toAngle) {
    //   currentAngle += toAngle > 1.5 * Math.PI ? 0.04 : 0.02;
    //   if (currentAngle > toAngle) currentAngle = toAngle;
    //   requestAnimationFrame(() => {
    //     draw(toAngle, currentAngle);
    //   });
    // }
  };
  return (
    <div className={styles.container}>
      <canvas id="canvas" className={styles.canvas} width="1000" height="1000" />
      <div className={styles.form}>
        <span className={styles.title}>{title}</span>
        <div className={styles.input}>
          <input defaultValue={value} />
        </div>
        <span className={styles.suffix}>{suffix || 'kg'}</span>
      </div>
    </div>
  );
}

export default GaugeInput;
