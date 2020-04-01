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

const { pregnancy } = require('./config');
const keys = getKeys(pregnancy.data);

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

  }

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
        form.setFieldsValue({ ...values });
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
      const lmp = moment(value).format('YYYY-MM-DD')
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
  }

  render() {
    const { form } = this.props;
    return (
      <div className="page">
        <StepBar current={2} />
        <form className={styles.form}>
          <FormFields form={form} dataSource={pregnancy.data} onChange={this.onChange} />
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
