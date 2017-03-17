/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';

import {LayoutModelComponent} from "./layout-model/layout-model.component";
import {ProductComponent} from "./product/product.component";
import {
    DataTableModule,
    ConfirmDialogModule,
    ConfirmationService,
    SharedModule,
    DialogModule,
    ButtonModule
} from 'primeng/primeng';
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../../../common/components/components.module";
import {ProductService} from "./product/product.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {CalendarModule} from "primeng/components/calendar/calendar";

@NgModule({
    imports: [
        ComponentsModule,
        DataTableModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        SharedModule,
        ConfirmDialogModule,
        DialogModule,
        FormsModule,
        DialogModule,
        CommonModule,
        HttpModule
    ],
    exports: [],
    declarations: [LayoutModelComponent, ProductComponent],
    providers: [ProductService, ConfirmationService],
})
export class ProModule {
}