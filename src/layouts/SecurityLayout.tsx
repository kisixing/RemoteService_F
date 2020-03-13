import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import store from 'store';
import { stringify } from 'querystring';

import { Toast } from 'antd-mobile';

import PageLoading from '@/components/Loader';
import { ConnectState, ConnectProps } from '@/models/connect';
import { getHeaders } from '@/utils/utils';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentPregnancy?: any;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    const {
      dispatch,
      location: { query },
      currentPregnancy,
    } = this.props;

    const { code, p1, p2, token } = query; // p1 孕册id， p2 监测档案id/判图档案id
    // TODO 验证过程 验证全局 sessionStorage isLogin
    // 1、isLogin === true，不再异步验证用户信息
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, 600);


    if (p1 && p2) {
      // p1 p2存在，可知是从app跳转过来，进行判图操作
      const Authorization = getHeaders()['Authorization'];
      store.set('lianmp-token', Authorization);
      dispatch({
        type: 'global/updatePregnancy',
        payload: {
          id: p1
        },
      });
    } else if (code && !currentPregnancy.id) {
      // 2、url携带code值时就进行校验操作，获取url携带的code进行用户校验
      // 条件 --> 有url携带code，但无孕妇信息临时缓存
      dispatch({
        type: 'global/mpauth',
        payload: {
          code: query.code,
        },
      }).then((res: any) => {
        if (res && res.id) {}
      });
    } else if (!code) {
      // 3、code/isLogin都不存在，提示并返回登录
      Toast.info('未建档，请先创建孕册在进行相关操作...');
      // TODO 返回登录页面
    }
    // 3、code/isLogin都不存在，提示并返回登录
    if (!code) {
      // Toast.info('请携带孕妇code!');
      // TODO 返回登录页面
    }
  }

  render() {
    const { isReady } = this.state;
    const {
      children,
      loading,
      currentPregnancy,
      location: { query },
    } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    // 序列化初始地址，便于验证用户后返回此页面
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (loading || !isReady) {
      return <PageLoading fullScreen spinning />;
    }
    if (!currentPregnancy.id) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    // token、isBind，含有用户权限和已绑定的情况下才会进入主页
    return children;
  }
}

export default connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading.models.global,
}))(SecurityLayout);
