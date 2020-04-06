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
import { Button } from '@/components/antd-mobile';
import { getKeys, KG } from '@/utils';
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
const keys = getKeys(dataSource);

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
    // 痛经说明
    const dysmenorrheaNoteIndex = this.getKeyIndex('dysmenorrheaNote');
    if (values.dysmenorrhea && dysmenorrheaNoteIndex.length) {
      this.show(dysmenorrheaNoteIndex);
    } else {
      this.hide(dysmenorrheaNoteIndex);
    }

    // 烟
    const smokeNoteIndex = this.getKeyIndex('smokeNote');
    if (values.smoke && smokeNoteIndex.length) {
      this.show(smokeNoteIndex);
    } else {
      this.hide(smokeNoteIndex);
    }

    // 酒
    const alcoholNoteIndex = this.getKeyIndex('alcoholNote');
    if (values.alcohol && values.alcohol[0] !== '无' && alcoholNoteIndex.length) {
      this.show(alcoholNoteIndex);
    } else {
      this.hide(alcoholNoteIndex);
    }

    // 伴侣-烟
    const partnerSmokeNoteIndex = this.getKeyIndex('partnerSmokeNote');
    if (values.partnerSmoke && partnerSmokeNoteIndex.length) {
      this.show(partnerSmokeNoteIndex);
    } else {
      this.hide(partnerSmokeNoteIndex);
    }

    // 伴侣-酒
    const partnerAlcoholNoteIndex = this.getKeyIndex('partnerAlcoholNote');
    if (values.partnerAlcohol && values.partnerAlcohol[0] !== '无' && partnerAlcoholNoteIndex.length) {
      this.show(partnerAlcoholNoteIndex);
    } else {
      this.hide(partnerAlcoholNoteIndex);
    }

    // 放射线
    const radioactivityNoteIndex = this.getKeyIndex('radioactivityNote');
    if (values.radioactivity && radioactivityNoteIndex.length) {
      this.show(radioactivityNoteIndex);
    } else {
      this.hide(radioactivityNoteIndex);
    }

    // 药物
    const medicineNoteIndex = this.getKeyIndex('medicineNote');
    if (values.medicine && medicineNoteIndex.length) {
      this.show(medicineNoteIndex);
    } else {
      this.hide(medicineNoteIndex);
    }

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

  initValue = () => {
    const { form, currentPregnancy } = this.props;
    getPregnancy(currentPregnancy.id).then((res: any) => {
      if (res && res.id) {
        const values = _.pick(res, keys);
        // 初始化预产期
        const EDD = values.lmp && KG.getEdd(values.lmp);
        if (!values.edd) {
          values.edd = EDD;
        }
        if (!values.sureEdd) {
          values.sureEdd = EDD;
        }
        console.log('本孕信息初始值：', values);
        form.setFieldsValue({ ...values, smoke: true });
        this.setState({ values });
      }
    });
  };

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
      </div>
    );
  }
}

export default createDOMForm()(CurrentPregnancy);
