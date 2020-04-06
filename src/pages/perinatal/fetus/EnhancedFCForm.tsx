import React, { Component, forwardRef, useImperativeHandle } from 'react';
import { createForm } from 'rc-form';

import FormFields from '../FormFields';

const EnhancedFCForm = forwardRef<any, any>(({ form, data }, ref) => {
  useImperativeHandle(ref, () => ({
    form,
  }));
  return (
    <FormFields form={form} dataSource={data} />
  )
});

export default createForm()(EnhancedFCForm);
