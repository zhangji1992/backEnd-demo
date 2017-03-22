import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {BackendFrameComponent} from './backend-frame.component';

import {ProductManageComponent} from './QR-code-manage/product-manage/product-manage.component';
import {PlanOrderComponent} from './QR-code-manage/plan-order/plan-order.component';
import {DistributionManageComponent} from './QR-code-manage/distribution-manage/distribution-manage.component';
import {OperationCenterComponent} from './QR-code-manage/operation-center/operation-center.component';
import {DataStatisticsComponent} from './QR-code-manage/data-statistics/data-statistics.component';
import {TraceabilityManageComponent} from './QR-code-manage/traceability-manage/traceability-manage.component';
import {ExceptionQueryComponent} from './QR-code-manage/exception-query/exception-query.component';
import {PageNotFound2Component} from './my-common/page-not-found2/page-not-found2.component';
import {FooterInfoComponent} from "./my-common/footer-info/footer-info.component";
import {TopMenuComponent} from "./my-common/top-menu/top-menu.component";
import {OverviewComponent} from "./QR-code-manage/overview/overview.component";
import {QRCodeManageComponent} from "./QR-code-manage/QR-code-manage.component";
import {ComponentsModule} from "./my-common/components/components.module";
import {
  CalendarModule, CheckboxModule, DataTableModule, DialogModule, DropdownModule, PanelModule,
  TabViewModule,Message
} from "primeng/primeng";
import {ProductService} from "./QR-code-manage/product-manage/product-manage.service";
import {AddPlanComponent} from "./QR-code-manage/plan-order/add-plan.component";

const backendFrameRoutes = [
  {
    path: '',
    component: BackendFrameComponent,     //框架页面
    children: [
      {
        path: 'QR-code-manage', component: QRCodeManageComponent,
        children: [
          {path: '', redirectTo: '/overview', pathMatch: 'full'},
          {path: 'overview', component: OverviewComponent},
          {path: 'product-manage', component: ProductManageComponent},
          {path: 'plan-order', component: PlanOrderComponent},
          {path: 'distribution-manage', component: DistributionManageComponent},
          {path: 'operation-center', component: OperationCenterComponent},
          {path: 'data-statistics', component: DataStatisticsComponent},
          {path: 'traceability-manage', component: TraceabilityManageComponent},
          {path: 'exception-query', component: ExceptionQueryComponent},
          {path: '**', component: PageNotFound2Component}
        ]
      },
      // {path: '**', component: PageNotFound2Component}   //带参数的路由也会匹配
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
    RouterModule.forChild(backendFrameRoutes),
    TabViewModule,CheckboxModule,PanelModule
  ],
  exports: [],
  declarations: [
    FooterInfoComponent,
    TopMenuComponent,
    BackendFrameComponent,
    QRCodeManageComponent,
    AddPlanComponent,
    OverviewComponent,
    ProductManageComponent,
    PlanOrderComponent,
    DistributionManageComponent,
    OperationCenterComponent,
    DataStatisticsComponent,
    TraceabilityManageComponent,
    ExceptionQueryComponent,
    PageNotFound2Component
  ],
  providers: [ProductService]
})
export class BackendFrameModule {
}
