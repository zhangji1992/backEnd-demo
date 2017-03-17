/**
 * Created by zhangJi on 2017/3/14.
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from "@angular/core";
import {AppModule} from './app.module';
const platform = platformBrowserDynamic();

// Enable production mode unless running locally
// if (!/localhost/.test(document.location.host)) {
enableProdMode();
// }

platform.bootstrapModule(AppModule);