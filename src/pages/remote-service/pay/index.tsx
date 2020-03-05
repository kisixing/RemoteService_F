// 支付页面
import React,{ useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.less'; 
function Pay() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>

      </div>
      <div className={styles.footer}>
        
      </div>
    </div>
  )
}

export default connect()(Pay);
