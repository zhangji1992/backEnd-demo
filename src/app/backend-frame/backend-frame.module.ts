import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {BackendFrameComponent} from './backend-frame.component';

import {DemoComponent} from "./demo/demo";
import {OverviewComponent} from "./demo/overview/overview.component";
import {ProductManageComponent} from './demo/product-manage/product-manage.component';
import {PlanOrderComponent} from './demo/plan-order/plan-order.component';
import {DistributionManageComponent} from './demo/distribution-manage/distribution-manage.component';
import {OperationCenterComponent} from './demo/operation-center/operation-center.component';
import {DataStatisticsComponent} from './demo/data-statistics/data-statistics.component';
import {TraceabilityManageComponent} from './demo/traceability-manage/traceability-manage.component';
import {ExceptionQueryComponent} from './demo/exception-query/exception-query.component';
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
  PanelModule
} from "primeng/primeng";
import {ProductService} from "./QR-code-manage/product-manage/product-manage.service";
import {HomeComponent} from "./home/home.component";
import {ConfigurationHelperComponent} from "./configuration-helper/configuration-helper.component";
import {SalesHelperComponent} from "./sales-helper/sales-helper.component";
import {AddPlanComponent} from "./QR-code-manage/plan-order/add-plan.component";
import {RequestService} from "../providers/request.service";
import {requestOptionsProvider} from "../default-request-options.service";
import {ProvidersModule} from "../providers/providers.module";
import {AuthoritySystemComponent} from "./authority-system/authority-system";

const backendFrameRoutes = [
  {
    path: '',
    component: BackendFrameComponent,     //框架页面
    children: [
      // {
      //   path: 'home', component: HomeComponent,
      //   children: []
      // },
      // {
      //   path: 'QR-code-manage', component: QRCodeManageComponent,
      //   children: [
      //     {path: '', redirectTo: '/backend-frame/QR-code-manage/overview', pathMatch: 'full'},
      //     {path: 'overview', component: OverviewComponent},
      //     {path: 'product-manage', component: ProductManageComponent},
      //     {path: 'plan-order', component: PlanOrderComponent},
      //     {path: 'distribution-manage', component: DistributionManageComponent},
      //     {path: 'operation-center', component: OperationCenterComponent},
      //     {path: 'data-statistics', component: DataStatisticsComponent},
      //     {path: 'traceability-manage', component: TraceabilityManageComponent},
      //     {path: 'exception-query', component: ExceptionQueryComponent},
      //     {path: '**', component: PageNotFound3Component}
      //   ]
      // },
      // {
      //   path: 'configuration-helper', component: ConfigurationHelperComponent,
      //   children: []
      // },
      // {
      //   path: 'sales-helper', component: SalesHelperComponent,
      //   children: []
      // },
      {
        path: 'authority-system', component: AuthoritySystemComponent,
        children: []
      },
      {
        path: 'demo', component: DemoComponent,
        children: [
          {path: '', redirectTo: '/backend-frame/demo/demo-page', pathMatch: 'full'},
          {path: 'demo-page', component: ProductManageComponent},
          {path: 'demo-affairs', component: OverviewComponent},

          // {path: 'plan-order', component: PlanOrderComponent},
          // {path: 'distribution-manage', component: DistributionManageComponent},
          // {path: 'operation-center', component: OperationCenterComponent},
          // {path: 'data-statistics', component: DataStatisticsComponent},
          // {path: 'traceability-manage', component: TraceabilityManageComponent},
          // {path: 'exception-query', component: ExceptionQueryComponent},
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
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    DropdownModule,
    CalendarModule,
    DataTableModule,
    DialogModule,
    TabViewModule,
    CheckboxModule,
    PanelModule,
    ProvidersModule,
    RouterModule.forChild(backendFrameRoutes)
  ],
  exports: [],
  declarations: [
    AuthoritySystemComponent,
    DemoComponent,
    HomeComponent,
    ConfigurationHelperComponent,
    SalesHelperComponent,
    FooterInfoComponent,
    TopMenuComponent,
    BackendFrameComponent,
    AddPlanComponent,
    OverviewComponent,
    ProductManageComponent,
    PlanOrderComponent,
    DistributionManageComponent,
    OperationCenterComponent,
    DataStatisticsComponent,
    TraceabilityManageComponent,
    ExceptionQueryComponent,
    PageNotFound2Component,
    PageNotFound3Component
  ],
  providers: [requestOptionsProvider]
})
export class BackendFrameModule {
}
