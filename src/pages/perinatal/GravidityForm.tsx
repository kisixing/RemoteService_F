/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-23 00:08:59
 * @Description: 单次孕次情况表单
 */


import React from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import FormFields from './FormFields';

interface IProps {
  form: any
  fields?: any[]
}

function GravidityForm({ form, fields }: IProps) {
  console.log('pppppp', fields)
  return (
    <form>
      <FormFields form={form} dataSource={fields} />
    </form>
  )
}


export default createDOMForm()(GravidityForm);
