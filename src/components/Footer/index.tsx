/*
 * @Description: 页脚 copyright信息
 * @Author: Zhong Jun
 * @Date: 2020-02-21 14:13:24
 */
import React from 'react';
import styles from './index.less';

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <span className={styles.icon} /> */}
      <span className={styles.copyright}>© 2020 莲印医疗</span>
    </footer>
  );
}

export default Footer;
