/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionComponent} from "./position.component";


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [PositionComponent],
    declarations: [PositionComponent],
    entryComponents: [PositionComponent],
    providers: [],
})
export class ComponentsModule {
}