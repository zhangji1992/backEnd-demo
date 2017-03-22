/**
 * Created by zhangJi on 2017/3/14.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RequestService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,) {
    }

    public httpPost(url, param): Promise<any> {
        return this.http.post(url, JSON.stringify(param), {headers: this.headers})
            .toPromise()
            .then(response => {
                let result;
                let data = response.json();
                console.log("resonse data: ", data);
                //data.retCode = '0001';//for test
                if (data.retCode == '0000') {
                    console.log('ok');
                    result = data;
                } else {
                    console.log('fail:', data.retMsg);
                }
                return result;
            })
            .catch(this.handleError);
    }


    //错误回调
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}