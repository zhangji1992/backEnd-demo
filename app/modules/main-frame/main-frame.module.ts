/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainFrameComponent} from "./main-frame.component";
import {AccordionModule} from 'primeng/primeng';
import {MenuModule, MenuItem} from 'primeng/primeng';
import {MainFrameRoutingModule} from "./main-frame-routing.module";
import {ProModule} from "./pro/pro.module";
import {HomePageModule} from "./home/home.module";

@NgModule({
    imports: [
        AccordionModule,
        MenuModule,
        MainFrameRoutingModule,
        CommonModule,
        HomePageModule,
        ProModule,
    ],
    exports: [],
    declarations: [MainFrameComponent],
    providers: [],
})
export class MainFrameModule {
}