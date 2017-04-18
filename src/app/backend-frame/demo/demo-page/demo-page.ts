import {Component, OnInit} from '@angular/core';
import {Product, PrimeProduct} from "./product";
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService} from 'primeng/primeng';
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'demo-page',
  templateUrl: './demo-page.html',
  styleUrls: ['./demo-page.scss']
})
export class DemoPageComponent implements OnInit {
  display: boolean = false; //设置是否显示loading动画
  ifException: boolean = false;
  myException: string;
  displayDialog: boolean;
  pageNo: number = 1;
  pageSize: number = 10;
  newProduct: boolean;
  selectedProduct: Product;
  products: Product[];
  ifAllSelected: boolean = false;
  selectedProducts: string[] = [];
  searchName: string = '';
  searchType: string;
  searchRemarks: string = '';
  searchBeginTime: Date;
  searchEndTime: Date;
  searchUpdateStartTime: Date;
  searchUpdateEndTime: Date;
  product: Product = new PrimeProduct();

  newTabPanel: string = '添加演示';                 //新标签页名称
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
  product_birthday: Date;
  product_updateTime: Date;

  showForm: boolean = false; //默认不显示添加演示表单

  confrim: any;
  tabViewCss = {
    'border': '1px solid red'
  };

  dialogHeader: string;
  en: any; //配置日历语言

  constructor(private router: Router,
              private service: RequestService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    console.log('test', this.service.getUserName());
    this.search();
    this.setCalenderLanguage();
  }

  setCalenderLanguage() {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    };
  }

  alertDialog(errorMsg) {
    this.ifException = true;
    this.myException = errorMsg;
  }

  search() {
    let param = {
      "name": this.searchName,
      "remarks": this.searchRemarks,
      'start': moment(this.searchUpdateStartTime).format('YYYY-MM-DD HH:mm:ss'),
      'end': moment(this.searchUpdateEndTime).format('YYYY-MM-DD HH:mm:ss')
    };
    console.log('param', param);

    // this.display=true;//显示loading层
    //
    // this.service.search(this.pageNo, this.pageSize, param)
    //   .then(products => {
    //     console.log('search get', products);
    //     this.display=false;
    //     this.products = products;
    //   }, error => {
    //     this.display=false;
    //     this.alertDialog(error);
    //   })
    //   .catch(err => {
    //     this.display=false;
    //     this.ifException = true;
    //     console.log('err', err, err.json());
    //     this.myException = err;
    //   })
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
    this.product = new PrimeProduct();
    this.displayDialog = true;
  }

  addPlan() {

  }

  reset() {
    this.searchName = null;
    this.searchType = null;
    this.searchRemarks = null;
    this.searchBeginTime = null;
    this.searchEndTime = null;
    this.searchUpdateStartTime = null;
    this.searchUpdateEndTime = null;
  }

  edit(product) {
    console.log('eidt', product);

    this.newTabPanel = '编辑演示';
    this.ifTab1Active = false;
    this.ifTab2Active = true;
    this.display = true;
    this.showForm = true;

    // this.newProduct = false;
    // this.product = this.cloneProduct(product);
    // this.displayDialog = true;

    let param = {
      id: product.id
    };
    this.service.addOrEdit(param)
      .then(item => {
        this.showForm = true;
        this.display = false;
        this.initProduct(item);
      }, error => {
        this.showForm = false;
        this.display = false;
        this.alertDialog(error)
      }).catch(error => {
      this.showForm = false;
      this.display = false;
    });
  }

  //初始化表单数据
  initProduct(item) {
    this.product_id = item.id;
    this.product_name = item.name;
    this.product_age = item.age;

    this.product_birthday = new Date(item.birthday);
    this.product_updateTime = new Date(item.updateDate);
    this.product_email = item.loginEmail;
    this.product_password = item.password;
    this.product_ifEnable = item.isEnable;
    this.product_score = item.isScore;
    this.product_hits = item.hits;
    this.product_remarks = item.remarks;
    this.product_price = item.price;
  }


  changeTab(event) {
    if (event.index == 0) {
      this.newTabPanel = '添加演示';
      this.ifTab1Active = true;
      this.ifTab2Active = false;
      this.showForm = true;
    } else if (event.index == 1) {
      this.ifTab1Active = false;
      this.ifTab2Active = true;
      this.display = true;
      this.showForm = false;

      this.product_id = '';
      this.product_name = '';
      this.product_age = null;
      this.product_email = '';
      this.product_password = '';
      this.product_ifEnable = false;
      this.product_score = '';
      this.product_hits = null;
      this.product_updateTime = null;

      let param = {
        id: ''
      };
      this.service.addOrEdit(param)
        .then(item => {
          this.display = false;
          this.showForm = true;
          this.initProduct(item);
        }, error => {
          console.log('111', error);
          this.dialogHeader = '提示';
          this.display = false;
          this.confirmationService.confirm({
            message: error,
            accept: () => {
              this.ifTab1Active = true;
              this.ifTab2Active = false;
              this.showForm = true;
            },
            reject: () => {
              this.ifTab1Active = true;
              this.ifTab2Active = false;
              this.showForm = true;
            }
          });
        }).catch(error => {
        this.display = false;
      });
    }
  }

  product_cancel() {
    this.newTabPanel = '添加演示';

    this.ifTab1Active = true;
    this.ifTab2Active = false;
  }

  product_save() {
    this.display = true;
    let param = {
      "id": this.product_id,
      "remarks": '',
      "name": this.product_name,
      "age": null,
      "birthday": this.product_birthday,
      "loginEmail": this.product_email,
      "password": this.product_password,
      "price": null,
      "isEnable": this.product_ifEnable,
      "isScore": this.product_score,
      "score": null,
      "hits": this.product_hits,
      'updateDate': this.product_updateTime,
      "type": null,
      "info": null
    };
    console.log(this.product_birthday);
    this.service.save(param)
      .then(res => {
        this.display = false;
        this.newTabPanel = '添加演示';

        this.ifTab1Active = true;
        this.ifTab2Active = false;

        this.search();
      }, error => {
        this.display = false;
        this.alertDialog(error)
      }).catch(error => {
      this.display = false;
    });
  }

  cloneProduct(p: Product): Product {
    let product = new PrimeProduct();
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
    this.dialogHeader = '删除演示';
    let _self = this;
    this.confirmationService.confirm({
      message: '确定要删除该演示么',
      accept: () => {
        _self.display = true;
        let param = [{
          id: product.id
        }];
        this.service.del(param)
          .then(res => {
            _self.display = false;
            this.search();
          }, error => {
            _self.display = false;
            this.alertDialog(error)
          }).catch(err => {
          _self.display = false;
        });
      },
      reject: () => {
        _self.display = false;
      }
    });
    // this.products.splice(product.id - 1, 1);

  }

  batchDel() {
    this.dialogHeader = '批量删除';
    let _self = this;
    this.confirmationService.confirm({
      message: '确定批量删除这些演示吗？',
      accept: () => {
        _self.display = true;
        let param = [];
        for (let id of this.selectedProducts) {
          param.push({id: id});
        }
        this.service.del(param)
          .then(res => {
            _self.display = false;
            this.search();
          }, error => {
            _self.display = false;
            this.alertDialog(error)
          }).catch(err => {
          _self.display = false;
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
      // for (let item of this.products) {
      //   for (let prop in item) {
      //     if (prop == 'checked') {
      //       item[prop] = false;
      //     }
      //   }
      // }

      this.selectedProducts = [];
    }
  }
}


