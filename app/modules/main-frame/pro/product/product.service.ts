/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {MainFrameData} from "../../main-frame-data";

@Injectable()
export class ProductService {
    constructor(public http: Http) {
    }

    getProducts(): Promise<any> {
        return Promise.resolve(MainFrameData.products);
    }

    getProductsTypes(): Promise<any> {
        return Promise.resolve(MainFrameData.productsTypes);
    }
}