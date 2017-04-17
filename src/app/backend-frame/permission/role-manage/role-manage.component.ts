import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService, Message, TreeNode} from 'primeng/primeng';
import {Router} from "@angular/router";

@Component({
  selector: 'role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {
  position = ['产品管理', '产品'];
  ifException: boolean = false;
  myException: string;

  ifDistribute: boolean = false;
  displayDialog: boolean;
  pageNo: number = 1;
  pageSize: number = 10;
  newProduct: boolean;
  selectedProduct: any[];
  products: any[];
  ifAllSelected: boolean = false;                 //全选标识量
  selectedProducts: string[] = [];
  searchName: string = '';
  searchType: string;
  // searchRemarks: string = '';
  searchBeginTime: string;
  searchEndTime: string;
  product: any;

  newTabPanel: string = '角色添加';                 //新标签页名称
  ifTab1Active: boolean = true;
  ifTab2Active: boolean = false;

  //产品详情
  product_id: string;
  product_name: string;
  product_age: number;
  product_email: string;
  product_password: string;
  product_ifEnable: boolean;
  product_score: string;
  product_hits: number;

  product_remarks: string;
  product_price: number;
  product_birthday: string;

  distributeItem: any;              //列表中待分配角色
  distributeTable: any[];           //待分配角色的分配列表
  distributeDialogueTable: any[];   //待分配角色提示窗列表
  selectedRoles: string[] = [];     //选择的角色
  msgs: Message[] = [];

  searchLoginName: string;                //搜索框登录名
  searchDistributeName: string;           //搜索框姓名
  ifAllRolesSelected: boolean = false;    //角色全选标识量

  gotoLog: boolean = false;

  powerTree: TreeNode[];        //接口返回的角色授权树形菜单
  selectedPowers: TreeNode[];   //已选的树形菜单

  confrim: any;
  tabViewCss = {
    'border': '1px solid red'
  };

  confirmDialogHeader: string;      //确认窗标题

  constructor(private router: Router,
              private service: RequestService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.search();
  }

  //提示窗
  alertDialog(errorMsg) {
    this.ifException = true;
    this.myException = errorMsg;
  }

  search() {
    // let param = {
    //   "name": this.searchName,
    //   // "remarks": this.searchRemarks
    // };
    console.log('search');
    this.service.getRoleTable()
      .then(roles => {
        console.log('search get', roles);
        this.products = roles;
      }, error => {
        this.gotoLog = true;
        // this.alertDialog(error);
      })
      .catch(err => {
        console.log('err', err, err.json());
        this.alertDialog(err);
      })
  }

  //获取角色分配树
  getPowerTree() {
    this.service.getPowerTree()
      .then(data => {
        console.log('powerTree get', data);
        this.powerTree = data;
      })
      .catch(err => {
        this.alertDialog(err);
      });
  }

  goLogin() {
    this.ifException = false;
    this.router.navigate(['login']);
  }

  confirmDialog() {
    this.ifException = false;
  }

  add() {
    this.newProduct = true;
    this.product = {};
    this.displayDialog = true;
  }

  reset() {
    this.searchName = null;
    this.searchType = null;
    this.searchBeginTime = null;
    this.searchEndTime = null;
  }

  //打开角色分配标签页
  goDistributePanel(product) {
    this.newTabPanel = '角色分配';
    this.distributeItem = product;
    this.ifTab1Active = false;
    this.ifTab2Active = true;

    this.service.getDistributeTable()
      .then(data => {
        console.log('get distributeTable', data);
        this.distributeTable = data;
      }, error => {
        this.alertDialog(error);
      })
  }

  //角色分配标签页搜索框
  search2() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: '错误', detail: '功能开发中！'});

    //待后台接口完成
    // let param = {
    //   loginName: this.searchLoginName,
    //   name: this.searchDistributeName
    // };
    // this.service.search3()
    //   .then(data =>{
    //     this.distributeDialogueTable = data;
    //   }, error =>{
    //     this.alertDialog(error);
    //   });
  }

  selectAllRoles() {
    let temp = [];
    if (this.ifAllRolesSelected == true) {
      for (let item of this.distributeDialogueTable) {
        for (let prop in item) {
          if (prop == 'id') {
            temp.push(item[prop]);
          }
        }
      }
      this.selectedRoles = temp;
    } else {
      this.selectedRoles = [];
    }
  }

  //分配角色
  distributeRole() {
    this.ifDistribute = true;

    this.service.getDistributeDialogueTable()
      .then(data => {
        console.log('get distributeDialogueTable', data);
        this.distributeDialogueTable = data;
      }, error => {
        this.alertDialog(error);
      });
  }

  //批量确认分配
  confirmDistribute() {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: '提示', detail: '分配成功！'});
    this.ifDistribute = false;

    //待后台接口完成
    // let param = this.selectedRoles;
    // this.service.del(param)
    //   .then(res => {
    //     this.search();
    //   }, error => {
    //     this.gotoLog = false;
    //     this.alertDialog(error);
    //   })
  }

  edit(product) {
    console.log('eidt', product);

    this.newTabPanel = '角色编辑';
    this.ifTab1Active = false;
    this.ifTab2Active = true;

    // this.newProduct = false;
    // this.product = this.cloneProduct(product);
    // this.displayDialog = true;

    let param = {
      id: product.id
    };
    this.service.addOrEdit(param)
      .then(item => {
        this.initProduct(item);
      }, error => {
        this.gotoLog = false;
        this.alertDialog(error);
      });
  }

  //初始化表单数据
  initProduct(item) {
    this.product_id = item.id;
    this.product_name = item.name;
    this.product_age = item.age;
    this.product_birthday = item.birthday;
    this.product_email = item.loginEmail;
    this.product_password = item.password;
    this.product_ifEnable = item.isEnable;
    this.product_score = item.isScore;
    this.product_hits = item.hits;
    this.product_remarks = item.remarks;
    this.product_price = item.price;
  }

  changeTab(event) {
    console.log('ininin', event.index);
    if (event.index == 0) {
      this.newTabPanel = '角色添加';
      this.ifTab1Active = true;
      this.ifTab2Active = false;
    } else if (event.index == 1) {
      this.ifTab1Active = false;
      this.ifTab2Active = true;

      this.product_id = '';
      this.product_name = '';
      this.product_age = null;
      this.product_email = '';
      this.product_password = '';
      this.product_ifEnable = false;
      this.product_score = '';
      this.product_hits = null;

      let param = {
        id: ''
      };
      this.service.addOrEdit(param)
        .then(item => {
          this.initProduct(item);
        }, error => {
          console.log('111', error);
          // this.dialogHeader = '提示';
          // this.confirmationService.confirm({
          //   message: error,
          //   accept: () => {
          //     this.ifTab1Active = true;
          //     this.ifTab2Active = false;
          //   },
          //   reject: () => {
          //     this.ifTab1Active = true;
          //     this.ifTab2Active = false;
          //   }
          // });
        });

      this.getPowerTree();
    }
  }

  product_cancel() {
    this.newTabPanel = '角色添加';

    this.ifTab1Active = true;
    this.ifTab2Active = false;
  }

  product_save() {
    let param = {
      "id": this.product_id,
      "remarks": '',
      "name": this.product_name,
      "age": null,
      "birthday": null,
      "loginEmail": this.product_email,
      "password": this.product_password,
      "price": null,
      "isEnable": this.product_ifEnable,
      "isScore": this.product_score,
      "score": null,
      "hits": this.product_hits,
      "type": null,
      "info": null
    };
    this.service.save(param)
      .then(res => {
        this.newTabPanel = '角色添加';

        this.ifTab1Active = true;
        this.ifTab2Active = false;

        this.search();
      }, error => {
        this.gotoLog = false;
        this.alertDialog(error);
      });
  }

  cloneProduct(p: any): any {
    let product = {};
    for (let prop in p) {
      product[prop] = p[prop];
    }
    return product;
  }

  save() {
    console.log('save', this.product);
    if (this.newProduct) {
      this.product.id = this.products.length;
      console.log('add', this.product);
      this.products.push(this.product);
    }
    else {
      console.log('before', this.products);

      this.products[this.product.id - 1] = this.product;
      console.log('after', this.products);
    }
    this.product = null;
    this.displayDialog = false;
  }

  cancel() {
    // this.products.splice(this.product.id - 1, 1);
    this.product = null;
    this.displayDialog = false;
  }

  delete(product) {
    this.confirmDialogHeader = '删除产品';
    this.confirmationService.confirm({
      key: 'role-manage',
      message: '确定要删除该产品么',
      accept: () => {
        let param = [{
          id: product.id
        }];
        this.service.del(param)
          .then(res => {
            this.search();
          }, error => {
            this.gotoLog = false;
            // this.alertDialog(error)
          });
      },
    });
    this.products.splice(product.id - 1, 1);

  }

  batchDel() {
    this.confirmDialogHeader = '批量删除';
    this.confirmationService.confirm({
      message: '确定批量删除这些产品吗？',
      accept: () => {
        let param = [];
        for (let id of this.selectedProducts) {
          param.push({id: id});
        }
        this.service.del(param)
          .then(res => {
            this.search();
          }, error => {
            this.gotoLog = false;
            this.alertDialog(error);
          })
      },
    });
  }


  findSelectedProductIndex(): number {
    return this.products.indexOf(this.selectedProduct);
  }

  selectAll() {
    let temp = [];
    if (this.ifAllSelected == true) {
      for (let item of this.products) {
        for (let prop in item) {
          if (prop == 'id') {
            temp.push(item[prop]);
          }
        }
      }
      this.selectedProducts = temp;
    } else {
      this.selectedProducts = [];
    }
  }
}
