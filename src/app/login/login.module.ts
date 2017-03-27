/**
 * Created by zhangJi on 2017/3/24.
 */
import {NgModule} from '@angular/core';

import {LoginComponent}   from './login.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CheckboxModule, InputTextModule, PasswordModule} from "primeng/primeng";
import {ReactiveFormsModule} from "@angular/forms";

const loginRoutes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,ReactiveFormsModule,CheckboxModule,
    RouterModule.forChild(loginRoutes)],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule {
}
