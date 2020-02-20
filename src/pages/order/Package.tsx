import React, {ReactNode ,useState} from 'react';
import { Flex, NavBar, Icon, WhiteSpace } from 'antd-mobile';
import PackageList from "@/pages/order/PackageList";
import DetailPage from "@/pages/order/DetailPage";
// 模拟套餐数据
import { PACKAGE_LIST, packageContent } from "@/pages/order/config";

import styles from './Package.less';



export default function Package() {

  const [pageIndex, setPageIndex] = useState(0);
  const [packageKey, setPackageKey] = useState("");



  const getDetail = (key:string):void => {
    // 设置页面为index为1
    console.log(key);
    // 设置现在的套餐
    setPackageKey(key);
    setPageIndex(1);
  }

  const pageRender = (pageIndex:number):ReactNode => {
    switch (pageIndex) {
      case 0:
        return <PackageList listData={PACKAGE_LIST} detailHandler={getDetail}/>
        break;
      case 1:
        return <DetailPage detailData={packageContent[packageContent.findIndex(item => item.key === packageKey)]}/>
      default:
        return null;
    };
  };

  return (
    <div className={styles['package-list']}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => alert('back')}
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
}
