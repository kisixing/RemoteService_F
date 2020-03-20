/*
 * @Description: 我要咨询
 * @Author: Zhong Jun
 * @Date: 2020-03-20 10:23:03
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { createForm } from 'rc-form';
import { WingBlank, List, InputItem, TextareaItem, ImagePicker, Toast } from 'antd-mobile';
import { Button } from '@/components/antd-mobile';
import styles from './ConsultingDetails.less';

const defaultData = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
];

interface P {
  form: any
  dispatch: any
  mpuid?: string
}

interface S {
  files: any[]
};

@createForm()
@connect(({ global, loading }) => ({
  pregnancy: global.currentPregnancy,
  loading: loading,
}))
class ConsultingDetails extends PureComponent<P, S> {
  state = {
    files: defaultData || [],
  };

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };

  onSubmit = () => {
    const { form } = this.props;
    form.validateFields((error: any[], values: any) => {
      if (error) {
        return Toast.info('请填写完整的咨询信息！');
      }
      const val = {
        ...values,
        files: this.state.files,
      };
      console.log('咨询信息', val);
      Router.push({
        pathname: '/consultation/payment-page',
        query: {
          sn: 'b',
        },
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.container}>
        <List
          renderHeader={() => (
            <>
              <p className={styles.title}>健康状况</p>
              <p className={styles.tip}>请尽量完善您的健康状况，这样能得到更精准的指导</p>
            </>
          )}
        >
          {getFieldDecorator('weight', {
            rules: [{ required: true, message: '请输入现在的体重' }],
          })(
            <InputItem id="weight" labelNumber={7} type="digit" placeholder="请输入现在的体重">
              现体重 <span className="suffix">(kg)</span>
            </InputItem>,
          )}
          {getFieldDecorator('systolic-pressure ', {
            rules: [{ required: true, message: '请输入现在的收缩压' }],
          })(
            <InputItem id="weight" labelNumber={7} type="digit" placeholder="请输入现在的收缩压">
              收缩压 <span className="suffix">(mmHg)</span>
            </InputItem>,
          )}
          {getFieldDecorator('diastolic-pressure', {
            rules: [{ required: true, message: '请输入现在的舒张压' }],
          })(
            <InputItem id="weight" labelNumber={7} type="number" placeholder="请输入现在的舒张压">
              舒张压 <span className="suffix">(mmHg)</span>
            </InputItem>,
          )}
          <WingBlank style={{ padding: '0.24rem 0', fontSize: '0.24rem', color: '#000' }}>
            咨询内容
          </WingBlank>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入现在的舒张压' }],
          })(
            <TextareaItem
              placeholder="请详细输入你想咨询的内容，例如发生部位、主要症状、持续时间等，这样能得到医生更加详细的指导。"
              data-seed="content"
              rows={4}
            />,
          )}
        </List>
        <WingBlank>
          <div style={{ padding: '0.15rem 0', fontSize: '0.24rem', color: '#fb6f6f' }}>
            * 医生可直接查阅你在院内的孕期档案及远程监测数据
          </div>
          <ImagePicker
            length={4}
            files={this.state.files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 7}
            multiple
          />
          <div style={{ padding: '0.15rem 0', fontSize: '0.24rem', color: '#8d8dac' }}>
            * 医生可直接查阅你在院内的孕期档案及远程监测数据
          </div>
        </WingBlank>
        <div style={{ padding: '0.45rem 0.3rem' }}>
          <Button type="primary" onClick={this.onSubmit}>
            提交咨询
          </Button>
        </div>
      </div>
    );
  }
}

export default ConsultingDetails;
