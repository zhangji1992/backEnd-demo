/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {LoginComponent} from "./login.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: LoginComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule {
}