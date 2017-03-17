/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule}     from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {MainFrameComponent} from "./main-frame.component";
import {HomePageComponent} from "./home/home.component";
import {LayoutModelComponent} from "./pro/layout-model/layout-model.component";
import {ProductComponent} from "./pro/product/product.component";
import {MainFrameData} from "./main-frame-data";

let path = MainFrameData.path;
const routes: Routes = [
    {
        path: '', component: MainFrameComponent,
        children: [
            {path: '', component: HomePageComponent},
            {path: path.layoutModel, component: LayoutModelComponent},
            {path: path.product, component: ProductComponent},
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainFrameRoutingModule {
}