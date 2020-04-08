/*
 * @Description: fixed于页面右下角的返回按钮
 * @Author: Zhong Jun
 * @Date: 2020-02-21 15:15:15
 */

import React from 'react';
import Router from 'umi/router';
import Redirect from 'umi/redirect';
import { Touchable } from '@/components/antd-mobile';
import styles from './index.less';

interface Iprops {
  children?: React.ReactNode;
  type?: 'back' | 'home';
  route?: string;
}

export default function BackButton({ children, route, type = 'back' }: Iprops) {
  const [redirect, setRedirect] = React.useState(false);

  const onPress = () => {
    if (type === 'home') {
      return setRedirect(true);
    }
    if (route) {
      return Router.push(route);
    }
    return Router.goBack();
  };
  return (
    <Touchable>
      <div className={styles.wrapper} onClick={onPress}>
        <span className={styles.push}>{children || '返回'}</span>
        {redirect && <Redirect to="/" />}
      </div>
    </Touchable>
  );
}
