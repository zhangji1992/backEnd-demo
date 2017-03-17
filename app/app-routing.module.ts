/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {LoginComponent} from "./modules/login/login.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    //{path: 'login', children: LoginRoutingModule},
    //{path: 'login', component: LoginComponent},
    {path: 'main-frame', loadChildren: 'app/modules/main-frame/main-frame.module#MainFrameModule'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
