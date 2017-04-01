/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {requestOptionsProvider} from "../default-request-options.service";
import {Error} from "tslint/lib/error";


@Injectable()
export class RequestService {

  constructor(private http: Http,
              public router: Router) {
  }

  // private httpPost(url, param): Observable<any> {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let options = new RequestOptions({headers: headers});
  //
  //   return this.http.post(url, JSON.stringify(param), options)
  //     .map(res => res.json().data)
  //     .catch(this.handleError);
  //
  //
  //   // // .toPromise()
  //   // .then(response => {
  //   //   let data = response.json();
  //   //   if (data.resultStatus == 'success') {
  //   //     console.log('ok');
  //   //   } else {
  //   //     console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
  //   //   }
  //   //   return data;
  //   // })
  //   // .catch(this.handleError);
  // }

  //错误回调
  // private handleError(error: Response | any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Promise.reject(errMsg);
  // }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
   * 登录
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  login(url, param): Promise<any> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // return this.http.post(url, JSON.stringify(param), options)       //新建请求头

    return this.http.post(url, JSON.stringify(param))       //请求头已在app.module.ts中预设并注入
      .timeout(2000)
      .toPromise()
      .then(res => {
        // console.log('res', res.json());
        let data = res.json();
        if (data.resultStatus == 'success') {
          // console.log('ok');
          this.router.navigateByUrl("/backend-frame/demo/demo-page");
        } else {
          console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
        }
        return data;
      })
      .catch(this.handleError);
  }

  /**
   * 获取顶级菜单
   * @param url
   * @returns {Promise<any>}
   */
  getTopMenu(url): Promise<any> {
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let data = res.json();
        if (data.resultStatus = 'success') {
          // console.log('ok');
        } else {
          console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
        }
        return data.infoData;
      })
      .catch(this.handleError);
  }

  /**
   * 获取二级菜单
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  getLeftMenu(url, param): Promise<any> {
    return this.http.post(url, JSON.stringify(param))
      .toPromise()
      .then(res => {
        let data = res.json();
        if (data.resultStatus = 'success') {
          // console.log('ok');
        } else {
          console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
        }
        return data.infoData;
      })
      .catch(this.handleError);
  }

  /**
   * 搜索数据（合并获取列表）
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  search(url, param): Promise<any> {
    return this.http.post(url, JSON.stringify(param))
      .toPromise()
      .then(res => {
        let data = res.json();
        if (data.resultStatus = 'success'){
          console.log('ok');
        } else {
          console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
        }
        return data.infoData.items;
      })
      .catch(this.handleError);
  }
}
