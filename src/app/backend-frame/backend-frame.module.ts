import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {BackendFrameComponent} from './backend-frame.component';

import {DemoComponent} from "./demo/demo";
import {PageNotFound2Component} from './my-common/page-not-found2/page-not-found2.component';
import {PageNotFound3Component} from './my-common/page-not-found3/page-not-found3.component';
import {FooterInfoComponent} from "./my-common/footer-info/footer-info.component";
import {TopMenuComponent} from "./my-common/top-menu/top-menu.component";
import {ComponentsModule} from "./my-common/components/components.module";
import {
  TabViewModule,
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  PanelModule,
  ConfirmDialogModule,
  ConfirmationService,
  GrowlModule
} from "primeng/primeng";
import {requestOptionsProvider} from "../default-request-options.service";
import {AuthoritySystemComponent} from "./authority-system/authority-system";
import {CookieService} from "angular2-cookie/core";
import {DemoPageComponent} from "./demo/demo-page/demo-page";
import {DemoAffairsComponent} from "./demo/demo-affairs/demo-affairs";

const backendFrameRoutes = [
  {
    path: '',
    component: BackendFrameComponent,     //框架页面
    children: [
      {
        path: 'authority-system', component: AuthoritySystemComponent,
        children: []
      },
      {
        path: 'demo', component: DemoComponent,
        children: [
          {path: '', redirectTo: '/backend-frame/demo/demo-page', pathMatch: 'full'},
          {path: 'demo-page', component: DemoPageComponent},
          {path: 'demo-affairs', component: DemoAffairsComponent},
          {path: '**', component: PageNotFound3Component}
        ]
      },
      {path: '**', component: PageNotFound2Component}   //带参数的路由也会匹配
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    GrowlModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    DataTableModule,
    DialogModule,
    TabViewModule,
    CheckboxModule,
    PanelModule,
    RouterModule.forChild(backendFrameRoutes)
  ],
  exports: [],
  declarations: [
    AuthoritySystemComponent,
    DemoComponent,
    FooterInfoComponent,
    TopMenuComponent,
    BackendFrameComponent,
    DemoAffairsComponent,
    DemoPageComponent,
    PageNotFound2Component,
    PageNotFound3Component
  ],
  providers: [requestOptionsProvider, ConfirmationService, CookieService]
})
export class BackendFrameModule {
}
