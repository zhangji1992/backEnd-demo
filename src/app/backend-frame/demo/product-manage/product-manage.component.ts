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
  selectedProducts: string[];
  searchName: string = '';
  searchType: string;
  searchRemarks: string = '';
  searchBeginTime: string;
  searchEndTime: string;
  product: Product = new PrimeProduct();
  tabViewCss = {
    'border': '1px solid red'
  };

  constructor(public productService: ProductService,
              private service: RequestService) {
  }

  ngOnInit() {
    // this.productService
    //   .getProducts()
    //   .then(products => {
    //     this.products = products;
    //   });

    // this.productService
    //   .getProductsTypes()
    //   .then(productsTypes => {
    //     // console.log('productsTypes', productsTypes);
    //     this.productsTypes = productsTypes;
    //   });

    // this.cols = [
    //   {field: 'checked', header: '选择所有'},
    //   {field: 'name', header: '产品名称'},
    //   {field: 'type', header: '产品类型'},
    //   {field: 'createTime', header: '创建时间'},
    //   {field: 'operation', header: '操作'},
    // ];

    // this.productService
    //   .getProductsChecked()
    //   .then(selectedProducts => {
    //     // console.log('productsChecked', productsChecked);
    //     this.selectedProducts = selectedProducts;
    //   });

    this.search();
  }

  search() {
    let url = `http://mam.mindmedia.cn:8181/a/demo/testPage/list.do?pageNo=${this.pageNo}`;
    let param = {
      "name": this.searchName,
      "remarks": this.searchRemarks
    };
    this.service.search(url, param)
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
    this.newProduct = false;
    this.product = this.cloneProduct(product);
    console.log('111', this.product);
    this.displayDialog = true;
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
    this.products.splice(product.id - 1, 1);
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


