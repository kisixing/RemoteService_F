import React, {ReactNode ,useState, useEffect} from 'react';
import { Flex, NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

import PackageList from "@/pages/order/PackageList";
import DetailPage from "@/pages/order/DetailPage";
import PackageConfirm from '@/pages/order/PackageConfirm';
// 模拟套餐数据
import { PACKAGE_LIST, packageContent } from "@/pages/order/config";

import styles from './Package.less';

function Package(props: any) {

  const [pageIndex, setPageIndex] = useState(0);
  const [packageKey, setPackageKey] = useState("");


  // 0 -> 1
  const getDetail = (key:string):void => {
    // 设置现在的套餐
    setPackageKey(key);
    setPageIndex(1);
  };
  const toConfirmPage = () => {
    setPageIndex(pageIndex => pageIndex + 1);
  };


  const pageRender = (pageIndex:number):ReactNode => {
    switch (pageIndex) {
      case 0:
        return <PackageList listData={PACKAGE_LIST} indexHandler={getDetail}/>
        break;
      case 1:
        return <DetailPage
          detailData={packageContent[packageContent.findIndex(item => item.key === packageKey)]}
          indexHandler={toConfirmPage}
        />
      case 2:
        return <PackageConfirm
          confirmData={packageContent[packageContent.findIndex(item => item.key === packageKey)]}
        />
      default:
        return null;
    };
  };

  useEffect(() => {
    // const { dispatch } = props;
    // dispatch({
    //   type: 'combo/getPackage'
    // });
    if(packageKey !== "") {
      console.log('更换key了')
    }
  },[packageKey]);

  return (
    <div className={styles['package-list']}>
      <NavBar
        mode="light"
        icon={pageIndex !== 0 ? <Icon type="left" /> : null}
        onLeftClick={() => {let nextIndex = pageIndex - 1; setPageIndex(nextIndex)}}
      >
        套餐详情
      </NavBar>
      <Flex
        direction="column"
        justify="center"
      >
        {pageRender(pageIndex)}
      </Flex>
    </div>
  )
};

export default connect(({loading, combo}: ConnectState) => {
  // console.log(loading);
  console.log(combo);
  console.log(loading);
  return {
    // loading
  }
})(Package)
