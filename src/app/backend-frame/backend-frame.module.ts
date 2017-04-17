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
  GrowlModule, RadioButtonModule, TreeModule, TreeNode, SharedModule, TreeTableModule,BlockUIModule
} from "primeng/primeng";
import {requestOptionsProvider} from "../default-request-options.service";
import {PermissionComponent} from "./permission/permission";
import {CookieService} from "angular2-cookie/core";
import {DemoPageComponent} from "./demo/demo-page/demo-page";
import {DemoAffairsComponent} from "./demo/demo-affairs/demo-affairs";
import {UserManageComponent} from "./permission/user-manage/user-manage.component";
import {RoleManageComponent} from "./permission/role-manage/role-manage.component";
import {MenuManageComponent} from "./permission/menu-manage/menu-manage.component";
import {LoadingComponent} from "./my-common/loading/loading.component";

const backendFrameRoutes = [
  {
    path: '',
    component: BackendFrameComponent,     //框架页面
    children: [
      {
        path: 'permission', component: PermissionComponent,
        children: [
          {path: '', redirectTo: '/backend-frame/permission/user-manage', pathMatch: 'full'},
          {path: 'user-manage', component: UserManageComponent},
          {path: 'role-manage', component: RoleManageComponent},
          {path: 'menu-manage', component: MenuManageComponent},
          {path: '**', component: PageNotFound3Component}
        ]
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
    CheckboxModule,TreeTableModule,SharedModule,
    PanelModule,RadioButtonModule,TreeModule,BlockUIModule,
    RouterModule.forChild(backendFrameRoutes)
  ],
  exports: [],
  declarations: [
    PermissionComponent,
    UserManageComponent,
    RoleManageComponent,
    MenuManageComponent,

    DemoComponent,
    DemoAffairsComponent,
    DemoPageComponent,

    FooterInfoComponent,
    TopMenuComponent,
    BackendFrameComponent,
    PageNotFound2Component,
    PageNotFound3Component,
    LoadingComponent
  ],
  providers: [requestOptionsProvider, ConfirmationService, CookieService]
})
export class BackendFrameModule {
}
