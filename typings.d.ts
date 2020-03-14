declare module 'dva';
declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module 'mockjs';
// declare module 'express';
declare module 'weixin-js-sdk';
declare module 'parsec-ls';
declare module 'react-sticky';
declare module 'nprogress';
declare module 'react-pdf';
declare module 'store';
declare module 'react-pdf/dist/entry.webpack';
declare module 'chart.js';
declare module 'numeral';

declare module "*.json" {
  const content: object;
  export default content;
};
declare module 'global' {
  export const g_app: object;
  export const ga: Function;
  export const window: object;
}

declare module "rc-form" {
  export const createForm: Function;
  export const createFormField: Function;
  export const formShape: object;
}

declare module 'rc-form/lib/createDOMForm'

declare interface Window {
  g_app: any
  baseurl: any
}
