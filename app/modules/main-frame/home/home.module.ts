/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';

import {HomePageComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
    imports: [HomeRoutingModule],
    exports: [],
    declarations: [HomePageComponent],
    providers: [],
})
export class HomePageModule {

}