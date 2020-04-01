/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-01 22:06:56
 * @Description: 体重记录
 * chart.js参考https://www.chartjs.org/docs/latest/charts/line.html
 */

import React, { useRef, useState, useEffect } from 'react';
import Chart from 'chart.js';

import styles from '../signs/RecordsTabBar.less';

const nowTimeStamp = Date.now();
const end = new Date(nowTimeStamp);
const start = new Date(nowTimeStamp - 1000 * 60 * 60 * 24 * 7);

function Record() {
  const chartEl = useRef(null);
  const [state, setstate] = useState('');

  useEffect(() => {
    newChart();
  }, []);

  // 新建曲线
  const newChart = () => {
    const ctx = chartEl.current.getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: '体重', // 当前数据的说明
            fill: false, // 是否要显示数据部分阴影面积块  false:不显示
            borderColor: 'rgba(255, 99, 132, 0.8)', // 数据曲线颜色
            pointBackgroundColor: '#fff', // 数据点的颜色
            borderWidth: 4,
            fillColor: 'rgba(220, 220, 220, 0.2)',
            strokeColor: 'rgba(220, 220, 220, 1)',
            pointColor: 'rgba(220, 220, 220, 1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220, 220, 220, 1)',
            data: [45, 46, 46.5, 47, 47.8, 48.3, 48.9], // 填充的数据
          },
        ],
      },
      options: {
        responsive: true,
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30
            }
        },
        title: {
          display: true,
          fontSize: 28,
          text: 'Chart.js Line Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
          },
          yAxes: [
            {
              ticks: {
                // 可以根据孕前体重制定纵坐标范围,上浮10kg，下浮5kg
                max: 60,
                min: 40,
                stepSize: 2.5,
              },
            },
          ],
        },
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <canvas ref={chartEl} id="canvas" className={styles.canvas} />
      </div>

      <div className={styles.list}>
        <div className={styles.header}>
          <div className={styles.title}>列表记录</div>
          <div className={styles.extra}>共 ~ 条</div>
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  );
}

export default Record
