/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-05 00:22:14
 * @Description: 胎儿信息组件
 */

import React, { forwardRef, createRef, useState } from 'react';
import { List } from 'antd-mobile';
import { IconFont } from '@/components/antd-mobile';
import EnhancedFCForm from './EnhancedFCForm';

import styles from './FetusComponent.less'

interface IProps {
  required?: boolean
  data: any[]
  number?: number
  value?: object
  children?: React.ReactNode
  onChange?: () => void
}

function FetusComponent({ children, required, data, number = 1, value, onChange = () => {}}: IProps, ref: any) {
  const formRef = createRef();
  const [dataSource, setDataSource] = useState([])
  return (
    // <IconFont type="fetus" color="#f00" />
    <div>
      <List
        renderHeader={() => (
          <>
            {required ? <i className={styles.required}>*</i> : null}
            <span className={styles.label}>{children}</span>
          </>
        )}
        className="my-list"
      >
        <EnhancedFCForm
          wrappedComponentRef={formRef}
          data={[{ id: 'fetus', children: data }]}
        />
      </List>

    </div>
  )
}

export default forwardRef(FetusComponent)

