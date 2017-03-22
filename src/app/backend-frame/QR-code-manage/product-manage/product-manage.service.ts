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
}
