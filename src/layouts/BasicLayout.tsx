/**
 * 页面过度效果
 */
import React from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import NProgress from 'nprogress';
import { LocaleProvider } from 'antd-mobile';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { ConnectState } from '@/models/connect';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

NProgress.configure({ showSpinner: false });
let currentHref = '';

interface IProps {
  loading: any;
  [key: string]: any;
}

const BasicLayout: React.FC<IProps> = props => {
  const { children, loading, location: { pathname = '/' }, locale } = props;
  const { href } = window.location; // 浏览器地址栏中地址

  if (currentHref !== href) {
    // currHref 和 href 不一致时说明进行了页面跳转
    NProgress.start(); // 页面开始加载时调用 start 方法
    if (!loading.global) {
      // loading.global 为 false 时表示加载完毕
      NProgress.done(); // 页面请求完毕时调用 done 方法
      currentHref = href; // 将新页面的 href 值赋值给 currHref
    }
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={pathname}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames="fade"
        timeout={300}
      >
        <LocaleProvider locale={locale === 'en' ? enUS : {}}>{children}</LocaleProvider>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default withRouter(connect(({ loading, global }: ConnectState) => ({ loading, locale: global.locale }))(BasicLayout));
