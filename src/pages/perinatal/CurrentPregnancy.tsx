/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 本孕信息
 */

import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Router from 'umi/router';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Modal, ActivityIndicator } from 'antd-mobile';
import { Button } from '@/components/antd-mobile';
import { KG } from '@/utils';
import { getRealData, assignmentData, submittedData, setFormId } from './utils';
import { getPregnancy, updatePregnancy } from '@/services/user';
import { ConnectState } from '@/models/connect';
import FormFields from './FormFields';
import StepBar from './StepBar';
import styles from './styles.less';

// 读取配置文件
const { pregnancy } = window.configuration;
const dataSource = pregnancy.data;

interface P {
  loading?: boolean;
  form: any;
  currentPregnancy?: any;
  dispatch?: any;
}

interface S {
  values?: object;
  isLoading?: boolean;
}

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading,
}))
class CurrentPregnancy extends React.PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      values: {}, // 保存api获取的原始values，备表单提交时获取对应表的id值
      isLoading: true,
    };
  }

  componentDidMount() {
    this.initValue();
  }

  componentWillReceiveProps() {
    // const { dataSource } = this.state;
    const values = this.props.form.getFieldsValue([
      'dysmenorrhea',
      'nearRelation&nearRelationNote',
    ]);

    // console.log('values update', values);
  }

  // 确定key位置
  getKeyIndex = (key: string) => {
    const data = [...dataSource];
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

  // form表单初始化
  initValue = () => {
    const { form, currentPregnancy } = this.props;
    getPregnancy(currentPregnancy.id).then((res: any) => {
      this.setState({ isLoading: false });
      if (res && res.id) {
        // 获取field配置的key
        const values = assignmentData(res, dataSource);
        // 初始化预产期
        const EDD = values.lmp && KG.getEdd(values.lmp);
        if (!values.edd) {
          values.edd = EDD;
        }
        if (!values.sureEdd) {
          values.sureEdd = EDD;
        }
        // 若BMI为空时，计算BMI值
        if (!values['personalProfile.bmi']) {
          const height = values['personalProfile.preheight'];
          const weight = values['personalProfile.preweight'];
          values['personalProfile.bmi'] = this.getBMI(parseFloat(weight), parseFloat(height));
        }
        // 过滤掉不是本页的表单项
        const originalValues = getRealData(res, dataSource);
        console.log('本孕信息初始值：', originalValues, values);
        form.setFieldsValue(values);
        this.setState({ values: originalValues });
      }
    });
  };

  onSubmit = () => {
    const originalValues = this.state.values;
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        return;
      }
      const newValues = submittedData(values, dataSource);
      // console.log('表单本孕信息', values, newValues);
      // 给各个字表加上id
      const v = setFormId(originalValues, newValues);
      dispatch({
        type: 'global/updatePregnancy',
        payload: v,
      }).then((res: any) => {
        if (res && res.id) {
          Modal.alert('提示', '本孕信息保存成功！', [
            { text: '取消', onPress: () => {} },
            { text: '下一步', onPress: () => Router.push('/perinatal/pregnancy-history') },
          ]);
        }
      });
    });
  };

  onChange = (id: string, value: any) => {
    const {
      form: { setFieldsValue, getFieldsValue, getFieldValue },
    } = this.props;
    if (id === 'lmp') {
      const lmp = moment(value).format('YYYY-MM-DD');
      const EDD = KG.getEdd(lmp);
      const GES = KG.getGesweek(EDD);
      const values = getFieldsValue(['gestationalWeek', 'edd', 'sureEdd']);
      // console.log('object', value, EDD, GES, values);

      const params: any = {
        gestationalWeek: GES,
        edd: EDD,
      };

      if (!values.sureEdd) {
        params.sureEdd = EDD;
      }
      setFieldsValue(params);
    }
    // BMI计算
    if (id === 'personalProfile.preheight') {
      const weight = getFieldValue('personalProfile.preweight');
      let bmi = undefined;
      if (value) {
        bmi = this.getBMI(parseFloat(weight), parseFloat(value));
      }
      setFieldsValue({ 'personalProfile.bmi': bmi });
    }
    if (id === 'personalProfile.preweight') {
      const height = getFieldValue('personalProfile.preheight');
      let bmi = undefined;
      if (value) {
        bmi = this.getBMI(parseFloat(value), parseFloat(height));
      }
      setFieldsValue({ 'personalProfile.bmi': bmi });
    }
  };

  // BMI指数计算 体重（kg）/身高平方（m²）
  getBMI = (weight: number, height: number) => {
    // 身高 cm--> m
    // 标准对照表
    // 偏瘦 <= 18.4
    // 正常 18.5 ~ 23.9
    // 过重 24.0 ~ 27.9
    // 肥胖 >= 28.0
    const result = weight / Math.pow(height / 100, 2);
    return Math.floor(result * 100) / 100;
  };

  render() {
    const { form } = this.props;
    return (
      <div className="page">
        <StepBar current={2} />
        <form className={styles.form}>
          <FormFields form={form} dataSource={dataSource} onChange={this.onChange} />
        </form>
        <div className="bottom_button">
          <Button type="primary" onClick={this.onSubmit}>
            确定
          </Button>
        </div>
        <ActivityIndicator toast text="Loading..." animating={this.state.isLoading} />
      </div>
    );
  }
}

export default createDOMForm()(CurrentPregnancy);
