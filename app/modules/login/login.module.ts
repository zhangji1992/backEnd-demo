/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';

import {LoginComponent}   from './login.component';
import {LoginRoutingModule} from "./login-routing.module";

@NgModule({
    imports: [LoginRoutingModule],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule {
}