/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-04 18:12:43
 * @Description: 孕产史列表，弃用
 */

import React, { PureComponent } from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Toast } from 'antd-mobile';
import _ from 'lodash';
import FormFields from '../FormFields';
import FetusesComponent from './FetusesComponent';
import { getFormKeys, getRealData, assignmentData, submittedData } from '../utils';

// 读取配置文件
const { history } = window.configuration;
const dataSource = history.data;
const formFields = history.data[0]['children'];

// 获取需要进行value取值转换的key
export function getSpecialKeys(data = []) {
  const result = data.filter((e: any) => {
    const type = e.type === 'picker' || e.type === 'multiple-picker';
    const format = e.valueFormat === 'labelInValue';
    return type && format;
  });
  return result;
}

interface P {
  loading?: boolean;
  form: any
  id: string
  values: {
    id?: string | number | undefined;
    [propName: string]: any;
  }
  index?: number
}

interface S {
  visible: boolean
  number?: number
  id?: string | number | undefined;
};

class GravidityForm extends PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      number: 0,
      id: ''
    }
  }

  componentDidMount() {
    this.initValue();
  }

  componentWillReceiveProps() {
    const values = this.props.form.getFieldsValue([
      'isBirth',
      'fetalcount'
    ]);
    // console.log('是否分娩', values);
    //////////////////////////////////////////////////////////////
    //////////////// 分娩情况下的表单 ///////////////////////////////
    //////////////////////////////////////////////////////////////
    // 分娩医院
    const hospitalIndex = this.getKeyIndex('hospital');
    // 分娩孕周
    const gestationalWeekIndex = this.getKeyIndex('gestationalWeek');
    // 分娩胎数
    const fetalcountIndex = this.getKeyIndex('fetalcount');
    // 分娩方式
    const deliveryWayIndex = this.getKeyIndex('deliveryWay');
    // 产溽热
    const puerperalFeverIndex = this.getKeyIndex('puerperalFever');
    // 产后出血
    const hemorrhageIndex = this.getKeyIndex('hemorrhage');

    //////////////////////////////////////////////////////////////
    //////////////// 未分娩情况下的表单 ///////////////////////////////
    //////////////////////////////////////////////////////////////
    // 流产方式
    const abortionIndex = this.getKeyIndex('abortionWay');
    // 不良生育史
    const unhealthIndex = this.getKeyIndex('unhealth');
    // 是否清宫
    const currettageIndex = this.getKeyIndex('currettage');

    // 根据是否分娩isBirth显示隐藏处理
    if (values.isBirth === true) {
      hospitalIndex && this.show(hospitalIndex);
      gestationalWeekIndex.length && this.show(gestationalWeekIndex);
      fetalcountIndex.length && this.show(fetalcountIndex);
      deliveryWayIndex && this.show(deliveryWayIndex);
      puerperalFeverIndex.length && this.show(puerperalFeverIndex);
      hemorrhageIndex.length && this.show(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && this.hide(abortionIndex);
      unhealthIndex.length && this.hide(unhealthIndex);
      currettageIndex.length && this.hide(currettageIndex);
    } else if (values.isBirth === false) {
      hospitalIndex.length && this.hide(hospitalIndex);
      gestationalWeekIndex.length && this.hide(gestationalWeekIndex);
      fetalcountIndex.length && this.hide(fetalcountIndex);
      deliveryWayIndex && this.hide(deliveryWayIndex);
      puerperalFeverIndex.length && this.hide(puerperalFeverIndex);
      hemorrhageIndex.length && this.hide(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && this.show(abortionIndex);
      unhealthIndex.length && this.show(unhealthIndex);
      currettageIndex.length && this.show(currettageIndex);
    } else {
      hospitalIndex.length && this.hide(hospitalIndex);
      gestationalWeekIndex.length && this.hide(gestationalWeekIndex);
      fetalcountIndex.length && this.hide(fetalcountIndex);
      deliveryWayIndex && this.hide(deliveryWayIndex);
      puerperalFeverIndex.length && this.hide(puerperalFeverIndex);
      hemorrhageIndex.length && this.hide(hemorrhageIndex);
      // 未分娩下
      abortionIndex.length && this.hide(abortionIndex);
      unhealthIndex.length && this.hide(unhealthIndex);
      currettageIndex.length && this.hide(currettageIndex);
    }

    // 根据是否有胎数fetalcount显示新生儿情况表单
    if (values.isBirth) {
      this.setState({ visible: true, number: values.fetalcount })
    } else {
      this.setState({ visible: false })
    }
  }

  initValue = () => {
    const { form, values } = this.props;
    // 保存id，便于取值时拿回已经保存的孕产id
    this.setState({ id: values.id })
    // 初始化values
    const val = assignmentData(values, dataSource);

    console.log('孕产史初始化', values, val);

    form.setFieldsValue({ isBirth: val.isBirth });
    setTimeout(() => {
      form.setFieldsValue({ ...val });
    }, 100);
  }

  setValues = (values: any) => {
    // 特殊取值的属性
    const specialKeys = getSpecialKeys(formFields);
    // 配置上有的key属性
    // const originalValues = getRealData(res, dataSource);
    const configKeys = getFormKeys(dataSource);
    const result = _.pick(values, configKeys);

    for (let i = 0; i < specialKeys.length; i++) {
      const id = specialKeys[i]['id'];
      const options: any[] = specialKeys[i]['options'];
      const filtered = options.filter((e: any) => {
        const key = e.value;
        const value = values[key];
        return !!value;
      });
      result[id] = filtered;
    }
    return result;
  }

  getValues = () => {
    const { form: { validateFieldsAndScroll }, index } = this.props;
    let result: any = false;
    validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        Toast.info(`孕册记录${index}未填写完整`, 2)
        return result = false;
      }
      return result = submittedData(values, dataSource);
    })
    return {id: this.state.id, ...result};
  }

  // 确定key位置
  getKeyIndex = (key: string) => {
    const data = dataSource;
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

  show = (array: number[]) => {
    dataSource[array[0]]['children'][array[1]]['hide'] = false;
  };

  hide = (array: number[]) => {
    dataSource[array[0]]['children'][array[1]]['hide'] = true;
  };

  render() {
    const { form } = this.props;
    const { visible, number } = this.state;
    return (
      <form>
        <FormFields form={form} dataSource={dataSource} />
        {visible
          ? form.getFieldDecorator('children', {
              initialValue: [],
              rules: [{ required: true, message: '请填写完整的胎儿信息！' }],
            })(
              <FetusesComponent key="children" required={true} number={number}>
                {'胎儿信息'}
              </FetusesComponent>,
            )
          : null}
      </form>
    );
  }
}

export default createDOMForm()(GravidityForm);
