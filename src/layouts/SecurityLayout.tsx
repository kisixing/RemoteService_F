import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/Loader';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Toast } from 'antd-mobile';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: any;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch, location: { query }, currentUser } = this.props;
    const code = query.code;
    const isLogin = currentUser && currentUser.id;
    if (!code && !isLogin) {
      Toast.fail('请携带孕妇code!')
    }
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, 600);
    if (!isLogin || code !== currentUser.id) {
      dispatch({
        type: 'user/mpauth',
        payload: {
          code: query.code
        },
        callback: (res: object) => {
          console.log('check user:', res)
        }
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.id;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading fullScreen spinning />;
    }
    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}/>;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  isLogin: user.isLogin,
  loading: loading.models.user,
}))(SecurityLayout);
