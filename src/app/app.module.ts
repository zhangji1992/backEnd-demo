import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule,JsonpModule ,Http} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { PaginationModule } from 'ng2-bootstrap';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterInfoComponent } from './footer-info/footer-info.component';
import { UserTableComponent } from './user-table/user-table.component';
import {appRoutes} from './app.routes';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    LeftNavComponent,
    TopMenuComponent,
    FooterInfoComponent,
    UserTableComponent
  ],
  imports: [
    SharedModule,
    PaginationModule.forRoot(),
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
