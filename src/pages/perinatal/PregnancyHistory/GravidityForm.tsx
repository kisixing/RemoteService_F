/*
 * @Author: ZHONG JUN
 * @Date: 2020-04-04 18:12:43
 * @Description: 孕产史列表，弃用
 */

import React, { PureComponent } from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import FormFields from '../FormFields';
import FetusesComponent from './FetusesComponent';

// 读取配置文件
const configuration = window.configuration;
const dataSource = configuration.history.data;
const fetusData = configuration.history.data[0]['children'].filter((e: any) => e.id === 'fetus')[0]['data'];

interface P {
  loading?: boolean;
  form: any
  id: string
  values: object
}

interface S {
  visible: boolean
  number?: number
};

class GravidityForm extends PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      number: 0
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
    console.log('是否分娩', values);
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
    const abortionIndex = this.getKeyIndex('abortion');
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
    if (values.isBirth && values.fetalcount) {
      this.setState({ visible: true, number: values.fetalcount })
    } else {
      this.setState({ visible: false })
    }
  }

  initValue = () => {
    const { form, values } = this.props;
    form.setFieldsValue({ isBirth: true });
    setTimeout(() => {
      form.setFieldsValue({ ...values, fetalcount: 1 });
    }, 100);
    setTimeout(() => {
      form.setFieldsValue({ ...values, fetalcount: 1, fetus: [{ childGender: 1 }] });
    }, 200);
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
    console.log('visible', visible);
    return (
      <form>
        <FormFields form={form} dataSource={dataSource} />
        {visible ? form.getFieldDecorator('fetus', {
            initialValue: [],
            rules: [{ required: true, message: '请填写完整的胎儿信息！' }],
          })(
            <FetusesComponent key="fetus" required={true} data={fetusData} number={number}>
              {'胎儿信息'}
            </FetusesComponent>,
          ) : null
        }
      </form>
    )
  }
}

export default createDOMForm()(GravidityForm);
