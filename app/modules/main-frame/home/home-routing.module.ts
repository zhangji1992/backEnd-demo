/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {HomePageComponent} from "./home.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: HomePageComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {
}