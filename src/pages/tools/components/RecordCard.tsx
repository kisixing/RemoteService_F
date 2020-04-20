import React, { ReactNode} from 'react';

import styles from './RecordCard.less';

interface ContentsProp{
  name: string|ReactNode,
  key?: string,
  max?: number,
  min?: number,
  unit?: string,
  normalText?: string|ReactNode,
  errorText?: string|ReactNode,
  render?:(item: any) => ReactNode
}

export interface RecordCard{
  title: string|ReactNode,
  titleExact?: string|ReactNode,
  contents: Array<ContentsProp>,
  dataSource: object,
}

export default function RecordCard(props: RecordCard){
  const { title, titleExact, contents, dataSource } = props;
  console.log(contents);
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.src}>{title}</div>
        <div className={styles.date}>{titleExact}</div>
      </div>
      <div className={styles.content}>
        {contents.map((v,index) => (
          <div key={index}>
            <div><span>{v.name}</span></div>
            {v.key ? [
              <div><span>{dataSource[v.key]} {v.unit}</span></div>,
              <div>
                <span>
                  {dataSource[v.key] < v.min || dataSource[v.key] > v.max 
                  ? v.errorText 
                  : v.normalText}
                </span>
              </div>
            ] : (v.render ? v.render(dataSource) : <span>a</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}
