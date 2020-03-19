import { ProductItem } from '@/pages/remote-service/package/interface';
export interface PackageOrderItem{
  id:number,
  sn:string|any,
  createtime:string,
  price:number,
  paytype:number,
  payment:number|null,
  paystate:number|null,
  state: ORDER_STATE|null,  
  validdate:number|null,
  service1amount: number|null,
  service2amount: number|null,
  service3amount: number|null,
  service4amount: number|null,
  servicepackage:{
    id:number,
    type:string,
    name:string,
    isdeleted:number,
    sortorder:number
  },
  products?: Array<ProductItem>,
  device:any,
  fType?:ORDER_TYPE,
}

interface CTGExamProp{
  id:number,
  startTime:string,
  endTime:string,
  result:string|null,
  note:string,
  diagnosis:string|null,
  report:any,
  fetalposition:any
  fetalnum:any,
  sign:any,
  signable:boolean
}

interface PrenatalVisitProp{
  id:number,
  visitType:string,
  visitTime:string,
  visitDate:string,
  gestationalWeek:any,
  appointmentDate:string|null,
  diagnosis:string|null,
  diagnosisCode:any,
  gynecologicalExam:any,
  doctor:any,
  ecgexam:CTGExamProp|null,
}

interface PregnancyProp{
  id:number,
  certificationNO:any,
  name:string,
  age:number,
  gender:any,
  dob:any,
  idType:string|null,
  idNO:any,
  telephone:string|null,
  mobile:string|null,
  permanentResidenceAddress: any,
  partnerAge: any,
  partnerMobile: any,
  lmp: any,
  edd: any,
  sureEdd: any,
  gravidity: number,
  parity: number,
  push: any,
  mpuid: any
}

export interface ServiceOrderItem{
  id:number,
  type:string,
  sn:string,
  state: ORDER_STATE|null,
  paytype:string,
  paystate:number,
  result:string|null,
  disgnosis:string|null,
  prescription:string|null,
  prenatalvisit:PrenatalVisitProp|null,
  doctor:any,
  pregnancy:PregnancyProp|null,

  fType?:ORDER_TYPE
}

/**
 * 套餐订单
 * 判图服务订单
 * 咨询服务订单
 */
export enum ORDER_TYPE{
  PACKAGE = 0,
  APPLY,
  CONSULT
}
/**
 * 订单状态
 */
export enum ORDER_STATE{
  NEW = 0,
  PAID,
  USING,
  FINISHED,
  CLOSED,
  OVERDUE,
  CANCELED
}
