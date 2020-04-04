/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-23 00:08:59
 * @Description: 单次孕次情况表单
 */

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import _ from 'lodash';
import FormFields from './FormFields';

interface IProps {
  id: string
  form: any
  fields?: any[]
  values: object
}

const GravidityForm = forwardRef(({ id, form, fields = [], values = {} }: IProps, ref: any) => {
  useImperativeHandle(ref, () => ({
    form,
  }));

  const [dataSource, setDataSource] = useState([...fields]);
  // 显示隐藏处理
  useEffect(() => {
    handleData();
    // form.setFieldsValue({ isBirth: false })
    return () => {};
  }, [form]);

  useEffect(() => {
    // 初始化赋值
    form.setFieldsValue({ ...values})
  }, []);

  const handleData = () => {
    const values = form.getFieldsValue([
      'isBirth',
    ]);
    console.log('是否分娩', values);
    //////////////////////////////////////////////////////////////
    //////////////// 分娩情况下的表单 ///////////////////////////////
    //////////////////////////////////////////////////////////////
    // 分娩医院
    const hospitalIndex = getKeyIndex('hospital');
    // 分娩孕周
    const gestationalWeekIndex = getKeyIndex('gestationalWeek');
    // 分娩胎数
    const fetalcountIndex = getKeyIndex('fetalcount');
    // 分娩方式
    const deliveryWayIndex = getKeyIndex('deliveryWay');
    // 产溽热
    const puerperalFeverIndex = getKeyIndex('puerperalFever');
    // 产后出血
    const hemorrhageIndex = getKeyIndex('hemorrhage');
    //////////////////////////////////////////////////////////////
    //////////////// 未分娩情况下的表单 ///////////////////////////////
    //////////////////////////////////////////////////////////////
    // 流产方式
    const abortionIndex = getKeyIndex('abortion');
    // 不良生育史
    const unhealthIndex = getKeyIndex('unhealth');
    // 是否清宫
    const currettageIndex = getKeyIndex('currettage');

    // 显示隐藏处理
    if (values.isBirth === true) {
      hospitalIndex && show(hospitalIndex);
      gestationalWeekIndex.length && show(gestationalWeekIndex);
      fetalcountIndex.length && show(fetalcountIndex);
      deliveryWayIndex && show(deliveryWayIndex);
      puerperalFeverIndex.length && show(puerperalFeverIndex);
      hemorrhageIndex.length && show(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && hide(abortionIndex);
      unhealthIndex.length && hide(unhealthIndex);
      currettageIndex.length && hide(currettageIndex);
    } else if (values.isBirth === false) {
      hospitalIndex.length && hide(hospitalIndex);
      gestationalWeekIndex.length && hide(gestationalWeekIndex);
      fetalcountIndex.length && hide(fetalcountIndex);
      deliveryWayIndex && hide(deliveryWayIndex);
      puerperalFeverIndex.length && hide(puerperalFeverIndex);
      hemorrhageIndex.length && hide(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && show(abortionIndex);
      unhealthIndex.length && show(unhealthIndex);
      currettageIndex.length && show(currettageIndex);
    } else {
      hospitalIndex.length && hide(hospitalIndex);
      gestationalWeekIndex.length && hide(gestationalWeekIndex);
      fetalcountIndex.length && hide(fetalcountIndex);
      deliveryWayIndex && hide(deliveryWayIndex);
      puerperalFeverIndex.length && hide(puerperalFeverIndex);
      hemorrhageIndex.length && hide(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && hide(abortionIndex);
      unhealthIndex.length && hide(unhealthIndex);
      currettageIndex.length && hide(currettageIndex);
    }
  }

  // 确定key位置
  const getKeyIndex = (key: string) => {
    const data = _.cloneDeep(dataSource);
    let index: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const children = data[i]['children'];
      for (let j = 0; j < children.length; j++) {
        if (children[j]['id'] === key) {
          index = [i, j];
        }
      }
    }
    return index;
  };

  const show = (array: number[]) => {
    const r = [...dataSource];
    r[array[0]]['children'][array[1]]['hide'] = false;
    setDataSource(r);
  };

  const hide = (array: number[]) => {
    const r = [...dataSource];
    r[array[0]]['children'][array[1]]['hide'] = true;
    setDataSource(r);
  };

  return (
    <form>
      <FormFields key={id} form={form} dataSource={dataSource} />
    </form>
  );
})


export default createDOMForm()(GravidityForm);
