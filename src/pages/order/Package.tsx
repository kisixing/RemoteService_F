import React, {ReactNode ,useState, useEffect} from 'react';
import { Flex, NavBar, Icon, WhiteSpace, Button, Modal, List, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from "rc-form";
import PackageList from "@/pages/order/PackageList";
import DetailPage from "@/pages/order/DetailPage";
import PackageConfirm from '@/pages/order/PackageConfirm';

import { ConnectState } from '@/models/connect';
import { PackageListItem } from './interface';

import styles from './Package.less';


// 修改套装值表单
class EditForm extends React.Component<any, any>{
  
  submit = () => {
    const { submit } = this.props;
    this.props.form.validateFields((error :any, value :any) => {
      console.log(error);
      console.log(value);
      submit(value);
    })
  }
  
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List>
        <InputItem {...getFieldProps('id')}>id</InputItem>
        <InputItem {...getFieldProps('type')}>type</InputItem>
        <InputItem {...getFieldProps('name')}>name</InputItem>
        <InputItem {...getFieldProps('price')}>price</InputItem>
        <List.Item><Button onClick={this.submit}>提交</Button></List.Item>
      </List>
    )
  }
}
const EditPackageForm = createForm()(EditForm)

const navTabsTitle = ['套餐列表','套餐详情','确认支付'];

function Package(props: any) {
  
  const { dispatch, packageList } = props;

  const [pageIndex, setPageIndex] = useState(0); // 页码
  const [packageId, setPackageId] = useState(-1); // 当前套餐id

  const [visible, setVisible] = useState(false);

  // 0 -> 1
  const getDetail = (id:number):void => {
    setPackageId(id);
    setPageIndex(pageIndex => pageIndex + 1);
  };
  // 1 -> 2
  const toConfirmPage = () => {
    setPageIndex(pageIndex => pageIndex + 1);
  };

  const handleNavLeftClick = () => {
    if(pageIndex !== 0){
      setPageIndex(pageIndex => pageIndex - 1);
    }else {

    }
  }

  const pageRender = (pageIndex:number):ReactNode => {
    switch (pageIndex) {
      case 0:
        return <PackageList listData={packageList} indexHandler={getDetail}/>
      case 1:
        return <DetailPage
          detailData={props.currentPackageDetail}
          indexHandler={toConfirmPage}
        />
      case 2:
        return <PackageConfirm
          confirmData={packageList[packageList.findIndex((item: PackageListItem) => item.id === packageId)]}
        />
      default:
        return null;
    }
  };

  // 仅获取渲染一次
  useEffect(() => {dispatch({type: 'combo/getPackage'})},[]);

  // id改变重新获取当前套餐数据
  useEffect(() => {dispatch({type: 'combo/getPackageData',payload: {id: packageId}})},[packageId]);

  return (
    <div className={styles.package}>
      <NavBar
        mode="light"
        icon={pageIndex !== 0 ? <Icon type="left" /> : null}
        onLeftClick={handleNavLeftClick}
      >
        {navTabsTitle[pageIndex]}
      </NavBar>
      <WhiteSpace/>
      <Flex direction="column" justify="center" className={styles.flex}>
        {pageRender(pageIndex)}
      </Flex>
      <div>
        {/*{pageIndex === 0 ? (
          <Button
            onClick={() => setVisible(true)}
          >修改套餐数据</Button>
        ): null}*/}
      </div>
      <Modal
        visible={visible}
        closable={true}
        onClose={() => setVisible(false)}
        title="修改套餐"
        footer={[{text: '确认', onPress: () => {}}]}
      >
        <EditPackageForm submit={(data:any) => dispatch({type: 'combo/setPackage', payload: data})}/>
      </Modal>
    </div>
  )
}


export default connect(({combo}: ConnectState) => {
  return {
    packageList: combo.packageList,
    currentPackageDetail: combo.currentPackageDetail
  }
})(Package)
