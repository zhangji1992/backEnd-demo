/**
 * Created by zhangJi on 2017/3/30.
 */
/**
 * Created by zhangJi on 2017/3/14.
 */
import {NgModule} from '@angular/core';
import {RequestService} from "./request.service";
import {requestOptionsProvider} from "../default-request-options.service";


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [RequestService, requestOptionsProvider],
})
export class ProvidersModule {
}
