import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./backend-frame/my-common/page-not-found/page-not-found.component";
import {ComponentsModule} from "./backend-frame/my-common/components/components.module";
// import {ProvidersModule} from "./providers/providers.module";
import {ConfirmationService, InputTextModule, TreeModule} from "primeng/primeng";
import {LoginModule} from "./login/login.module";
import {requestOptionsProvider} from "./default-request-options.service";
import {RequestService} from "./providers/request.service";
import {CookieService} from "angular2-cookie/core";
import {BackendFrameModule} from "./backend-frame/backend-frame.module";

const appRoutes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: "login", loadChildren: './login/login.module#LoginModule'},   //允许预加载
  {path: "backend-frame", loadChildren: './backend-frame/backend-frame.module#BackendFrameModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule,
    ComponentsModule,
    InputTextModule,
    TreeModule,
    ReactiveFormsModule,
    // ProvidersModule,
    LoginModule,
    BackendFrameModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [requestOptionsProvider, RequestService, ConfirmationService, CookieService],    //http请求头的统一预设值
  bootstrap: [AppComponent]
})
export class AppModule {

}
