/**
 * Created by zhangJi on 2017/3/16.
 */
export interface Product {
  'id'?;
  'checked'?;
  'name'?;
  'type'?;
  'area'?,
  'codesAmount'?,
  'status'?,
  'createTime'?;
  'operation'?;
  'email'?;
  'remarks'?;
}

export class PrimeProduct implements Product {
  constructor(public id?,
              public checked?,
              public name?,
              public type?,
              public area?,
              public codesAmount?,
              public status?,
              public createTime?,
              public operation?,
              public email?,
              public remarks?
  ) {
  }
}
