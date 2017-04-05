/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {Router} from "@angular/router";
import {interfaceUrl} from "./serverUrls";
import {Observable} from "rxjs";
import {requestOptionsProvider} from "../default-request-options.service";
import {Error} from "tslint/lib/error";


@Injectable()
export class RequestService {
  userName: string;

  constructor(private http: Http,
              public router: Router) {
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private httpPost(url, param?): Promise<any> {
    return this.http.post(url, JSON.stringify(param))               //请求头已在app.module.ts中预设并注入
      .toPromise()
      .then(res => {
        let data = res.json();
        if (data.resultStatus == 'success') {
          return data.infoData;
        } else {
          console.log('fail:', data.errorMassage || data.errorStackTrace || data.exception);
        }
      })
      .catch(this.handleError);
  }

  /**
   * 登录
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  login(param): Promise<any> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // return this.http.post(url, JSON.stringify(param), options)       //新建请求头
    return this.httpPost(interfaceUrl.login, param)
      .then(res => {
        console.log('userName', res);
        this.userName = res.name;
        this.router.navigateByUrl("/backend-frame/demo/demo-page");
      })
      .catch(this.handleError);
  }

  /**
   * 退出登录
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  logout(url, param?): Promise<any> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    // return this.http.post(url, JSON.stringify(param), options)       //新建请求头
    return this.httpPost(url, param)
      .then(() => {
        this.router.navigateByUrl("/login");
      })
      .catch(this.handleError);
  }

  /**
   * 获取顶级菜单
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  getTopMenu(param?): Promise<any> {
    return this.httpPost(interfaceUrl.getTopMenu, param)
      .then(res => res)
      .catch(this.handleError);
  }

  /**
   * 获取二级菜单
   * @param url
   * @param param
   * @returns {Promise<any>}
   */
  getLeftMenu(url, param): Promise<any> {
    return this.httpPost(url, param)
      .then(res => res)
      .catch(this.handleError);
  }

  /**
   * 搜索数据（合并获取列表）
   * @param pageNo 当前页码
   * @param pageSize 每页个数
   * @param param
   * @returns {Promise<any>}
   */
  search(pageNo, pageSize, param): Promise<any> {
    return this.httpPost(`${interfaceUrl.search}?pageNo=${pageNo}&pageSize=${pageSize}`, param)
      .then(res => res.items)
      .catch(this.handleError);
  }

  /**
   * 添加或编辑
   * @param param
   * @returns {Promise<any>}
   */
  addOrEdit(param) {
    return this.httpPost(interfaceUrl.addOrEdit, param)
      .then(res => res)
      .catch(this.handleError);
  }

  /**
   * 保存
   * @param param
   * @returns {Promise<any>}
   */
  save(param) {
    return this.httpPost(interfaceUrl.save, param)
      .then(res => res)
      .catch(this.handleError);
  }

  /**
   * 删除
   * @param param
   * @returns {Promise<any>}
   */
  del(param) {
    return this.httpPost(interfaceUrl.del, param)
      .then(res => res)
      .catch(this.handleError);
  }
}
