export interface PackageListItem {
  id: number;
  type: string;
  name: string;
  summary: string;
  price: number;
  suggestedprice: number;
  validdate: number;
  service1amount: number;
  service2amount: number;
  service3amount: number;
  service4amount: number;
  isdeleted: number;
  sortorder: number;
  topflag: 0
}

export interface CurrentPackageDetail {
  id: number;
  type: string;
  name: string;
  picture: string|null;
  createtime: string|null;
  is_deleted: number,
  introduction: string;
  specification: string;
  note: string;
  sortorder: 1;
  remain: string|null;
}
