/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-18 22:22:40
 * @Description: 今日新闻列表
 */

import * as React from 'react';
import { ListView } from 'antd-mobile';

import { router } from '@/utils/utils';
import styles from './NewsListView.less';

const NUM_ROWS = 5;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

interface IProps {
  data: any[]
  isLoading: boolean
}
export default (props: IProps) => {
  let ele = React.createRef();
  const { data = [], isLoading } = props;
  const initDataSource = new ListView.DataSource({
    rowHasChanged: (row1: string, row2: string) => row1 !== row2,
  });

  const [dataSource, setDataSource] = React.useState(initDataSource);
  React.useEffect(() => {
    const rData = genData();
    setDataSource(dataSource.cloneWithRows(rData))
  }, [])

  // const onEndReached = (event) => {
  //   // load new data
  //   // hasMore: from backend data, indicates whether it is the last page, here is false
  //   if (this.state.isLoading && !this.state.hasMore) {
  //     return;
  //   }
  //   console.log('reach end', event);
  //   this.setState({ isLoading: true });
  //   setTimeout(() => {
  //     this.rData = { ...this.rData, ...genData(++pageIndex) };
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //       isLoading: false,
  //     });
  //   }, 1000);
  // }

  let index = data.length - 1;
  const row = (rowData, sectionID, rowID) => {
    if (index < 0) {
      index = data.length - 1;
    }
    const obj = data[index--];
    return (
      <div key={rowID} style={{ padding: '0 15px' }}>
        <div
          style={{
            lineHeight: '50px',
            color: '#888',
            fontSize: 18,
            borderBottom: '1px solid #F6F6F6',
          }}
        >
          {obj.title}
        </div>
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <img style={{ height: '64px', marginRight: '15px' }} src={obj.url} alt="" />
          <div style={{ lineHeight: 1 }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.brief}</div>
            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span>¥</div>
          </div>
        </div>
      </div>
    );
  };

  const separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
    />
  );

  return (
    <div className={styles.container}>
      <ListView
        ref={ele}
        dataSource={dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? 'Loading...' : '加载更多...'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={5}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        // onEndReached={onEndReached}
        onEndReachedThreshold={10}
      />
    </div>
  )
}
