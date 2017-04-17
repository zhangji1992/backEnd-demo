/**
 * Created by zhangJi on 2017/4/13.
 */
export class Menu {
  constructor(public parentId: string,
              public name: string,
              public order?: number,
              public url?: string,
              public target?: string,
              public icon?: string,
              public ifShow?: boolean,
              public identify?: number,
              public ifManage?: boolean,
              public ifDecorate?: boolean,
              public remarks?: string) {
  }
}
