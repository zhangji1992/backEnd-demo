/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {ActivatedRoute, Router} from "@angular/router";
import {interfaceUrl} from "../../../providers/serverUrls";
import {Observable} from "rxjs";
import {requestOptionsProvider} from "../../../default-request-options.service";
import {Error} from "tslint/lib/error";
import {DialogModule} from "primeng/primeng";
import {RequestService} from "../../../providers/request.service";


@Injectable()
export class UserService extends  RequestService{
  /**
   * 查询列表
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  searchForm(param?): Promise<any> {
   return this.http.get('../../../../../src/mock-data/user-manage.json').toPromise().then(
      res => {
        let data = res.json();
        let resultStatus = data.resultStatus;
        if (resultStatus == 'success') {
          return data.infoData;
        }else{
          return Promise.reject(data);
        }
      }
    ).catch(this.handleError);
  }



}
