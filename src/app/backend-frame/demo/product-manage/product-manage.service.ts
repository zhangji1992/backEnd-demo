/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {BackendFrameData} from "../../../../mock-data/backend-frame-data";

@Injectable()
export class ProductService {
  constructor(public http: Http) {
  }

  getProducts(): Promise<any> {
    return Promise.resolve(BackendFrameData.products);
  }

  getProductsTypes(): Promise<any> {
    return Promise.resolve(BackendFrameData.productsTypes);
  }

  getProductsChecked(): Promise<any> {
    // console.log('products111', BackendFrameData.products);
    let cloneChecked = [];
    for (let i = 0, item; i < BackendFrameData.products.length; i++) {
      item = BackendFrameData.products[i];
      // console.log('item', item);
      for (let prop in item) {
        if (prop == 'checked') {
          cloneChecked.push(item[prop]);
        }
      }
    }
    // console.log('cloneChecked', cloneChecked);
    return Promise.resolve(cloneChecked);
  }
}
