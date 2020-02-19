import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface LoaderProps {
  spinning: boolean,
  fullScreen: boolean
}

const Loader = ({ spinning = false, fullScreen }: LoaderProps) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      {/* <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div> */}
      <div className={styles.box}>
        <div className={styles['loader-11']} />
        <div className={styles.text}>LOADING...</div>
      </div>
    </div>
  );
};

export default Loader;
