import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product-manage.service";
import {Product, PrimeProduct} from "./product";
import {SelectItem} from "primeng/components/common/api";
import {RequestService} from "../../../providers/request.service";

@Component({
  selector: 'product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss'],
  providers: [ProductService]
})
export class ProductManageComponent implements OnInit {
  position = ['产品管理', '产品'];
  displayDialog: boolean;
  pageNo: number = 1;
  pageSize: number = 10;
  newProduct: boolean;
  selectedProduct: Product;
  products: Product[];
  // productsTypes: SelectItem[];
  ifAllSelected: boolean = false;
  selectedProducts: string[] = [];
  searchName: string = '';
  searchType: string;
  searchRemarks: string = '';
  searchBeginTime: string;
  searchEndTime: string;
  product: Product = new PrimeProduct();

  newTabPanel: string = '添加产品';                 //新标签页名称
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

  tabViewCss = {
    'border': '1px solid red'
  };

  constructor(public productService: ProductService,
              private service: RequestService) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    let param = {
      "name": this.searchName,
      "remarks": this.searchRemarks
    };
    this.service.search(this.pageNo, this.pageSize, param)
      .then(products => {
        console.log('search get', products);
        this.products = products;
      })
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
    this.searchBeginTime = null;
    this.searchEndTime = null;
  }

  edit(product) {
    console.log('eidt', product);

    this.newTabPanel = '编辑产品';
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
      });
  }

  changeTab(event) {
    console.log('ininin', event.index);
    if (event.index == 0) {
      this.newTabPanel = '添加产品';
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
    }


    // this.newTabPanel = '添加产品';
    //
    // this.ifTab1Active = true;
    // this.ifTab2Active = false;
  }

  product_cancel() {
    this.newTabPanel = '添加产品';

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
        this.newTabPanel = '添加产品';

        this.ifTab1Active = true;
        this.ifTab2Active = false;

        this.search();
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
    let param = [{
        id: product.id
      }];
    this.service.del(param)
      .then(res => {
        this.search();
      });
  }

  batchDel() {
    let param = [];
    for (let id of this.selectedProducts) {
      param.push({id: id});
    }
    this.service.del(param)
      .then(res => {
        this.search();
      })
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


