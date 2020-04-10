/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-19 21:02:36
 * @Description: 本孕信息
 */

import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import moment from 'moment';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { Modal, ActivityIndicator } from 'antd-mobile';
import { Button } from '@/components/antd-mobile';
import { getKeys, getFields, KG } from '@/utils';
import { getPregnancy, updatePregnancy } from '@/services/user';
import { ConnectState } from '@/models/connect';
import FormFields from './FormFields';
import StepBar from './StepBar';
import styles from './styles.less';

// 读取配置文件
const configuration = window.configuration;
// 基本信息配置
// const originalDataSource = configuration.pregnancy.data; // _.cloneDeep()
const dataSource = configuration.pregnancy.data;

interface P {
  loading?: boolean;
  form: any
  currentPregnancy?: any
}

interface S {

};

@connect(({ global, loading }: ConnectState) => ({
  currentPregnancy: global.currentPregnancy,
  loading: loading,
}))
class CurrentPregnancy extends React.PureComponent<P, S> {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.initValue();
  }

  componentWillReceiveProps() {
    // const { dataSource } = this.state;
    // 获取需要监听的key键value
    // { dysmenorrhea, smoke, alcohol, partnerSmoke, partnerAlcohol }
    const values = this.props.form.getFieldsValue([
      'dysmenorrhea',
      'smoke',
      'alcohol',
      'partnerSmoke',
      'partnerAlcohol',
      'radioactivity',
      'medicine',
    ]);
    console.log('listen change', values);
  }

  // 确定key位置
  getKeyIndex = (key: string) => {
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
        const keys = getKeys(dataSource);
        const originalValues = _.pick(res, keys);
        console.log('keys', keys, originalValues);
        const values: any = this.processData(keys, originalValues);
        console.log('keys', values);
        // 初始化预产期
        const EDD = values.lmp && KG.getEdd(values.lmp);
        if (!values.edd) {
          values.edd = EDD;
        }
        if (!values.sureEdd) {
          values.sureEdd = EDD;
        }
        console.log('本孕信息初始值：', values);
        form.setFieldsValue({
          ...values,
          partnerDisease: ['高血压', '糖尿病', '其他疾病'],
          'smoke&smokeNote': { smoke: true, smokeNote: 10 },
        });
        this.setState({ values });
      }
    });
  };

  // 处理value初始化结构
  processData = (keys: string[] = [], values: object = {}) => {
    let result = { ...values };
    for (let i = 0; i < keys.length; i++) {
      const ele = keys[i];
      if (ele.includes('&')) {
        // key带有&字符
        const ids = ele.split('&');
        const obj = {
          [ids[0]]: values[ids[0]],
          [ids[1]]: values[ids[1]]
        };
        result = { ...result, [ele]: obj };
        delete result[ids[0]];
        delete result[ids[1]];
      }
    }
    return result;
  }

  onSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((error: any[], values: any) => {
      if (error) {
        return;
      }
      console.log('本孕信息', values);
    });
  };

  onChange = (id: string, value: any) => {
    if (id === 'lmp') {
      const {
        form: { setFieldsValue, getFieldsValue },
      } = this.props;
      const lmp = moment(value).format('YYYY-MM-DD');
      const EDD = KG.getEdd(lmp);
      const GES = KG.getGesweek(lmp);
      const values = getFieldsValue(['gestationalWeek', 'edd', 'sureEdd']);
      console.log('object', value, EDD, GES, values);

      const params = {
        gestationalWeek: GES,
        edd: EDD,
      };

      if (!values.sureEdd) {
        params.sureEdd = EDD;
      }
      setFieldsValue(params);
    }
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
