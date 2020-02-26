import { Result } from 'antd-mobile';
import React from 'react';
import { router } from 'umi';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
  <Result
    imgUrl={'https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg'}
    title="404"
    message="Sorry, the page you visited does not exist."
    buttonText="Back Home"
    buttonType="primary"
    onButtonClick={() => router.push('/')}
  />
);

export default NoFoundPage;
