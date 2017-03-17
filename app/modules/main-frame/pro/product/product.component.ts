/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";
import {SelectItem} from "primeng/components/common/api";

@Component({
    selector: 'pro-main',
    templateUrl: 'app/modules/main-frame/pro/product/product.component.html',
    styleUrls: ['app/modules/main-frame/pro/product/product.component.css']
})
export class ProductComponent implements OnInit {
    position = ['产品管理', '产品'];
    displayDialog: boolean;
    newProduct: boolean;
    selectedProduct: Product;
    products: Product[];
    productsTypes: SelectItem[];
    searchName: string;
    searchType: string;
    searchBeginTime: string;
    searchEndTime: string;
    product: Product = new PrimeProduct();
    cols: any[];

    constructor(public productService: ProductService) {
    }

    ngOnInit() {
        this.productService
            .getProducts()
            .then(products => {
                console.log('products', products);
                this.products = products;
            });

        this.productService
            .getProductsTypes()
            .then(productsTypes => {
                console.log('productsTypes', productsTypes);
                this.productsTypes = productsTypes;
            });

        this.cols = [
            {field: 'selectAll', header: '选择所有'},
            {field: 'name', header: '产品名称'},
            {field: 'type', header: '产品类型'},
            {field: 'createTime', header: '创建时间'},
            {field: 'operation', header: '操作'},
        ];
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

}

class PrimeProduct implements Product {
    constructor(public id?,
                public selectAll?,
                public name?,
                public type?,
                public createTime?,
                public operation?) {
    }
}