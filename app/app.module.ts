/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginModule} from "./modules/login/login.module";
import {MainFrameModule} from "./modules/main-frame/main-frame.module";

import {RequestService} from "./common/providers/request.service";
import {ComponentsModule} from "./common/components/components.module";
import {ProvidersModule} from "./common/providers/providers.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        LoginModule,
        AppRoutingModule,
        MainFrameModule,
        ComponentsModule,
        ProvidersModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [RequestService]
})
export class AppModule {
}