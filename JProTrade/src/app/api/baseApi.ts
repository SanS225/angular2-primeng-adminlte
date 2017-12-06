import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var window: any;
export class BaseApi<T>  {
    config = 'http://10.88.115.125:12024/ksbwrapper/';
    headers = new Headers({'Content-Type': 'application/json'});
    options = new RequestOptions({headers: this.headers});
    constructor(private http: Http) { }
    // 处理respones tojson
    private extractData(res: Response) {
        let body;
        try {
            body = res.json();
        } catch (e) {
            throw { message: 'system mistake!' };
        }
        if (body.errcode == 0) {
            // if (body.data instanceof Object) {
            //     body.data.__msg = body.msg;
            // }
            return body;
        } else {
            // Observable.throw({ message: body.msg });
            throw  { message: body.msg };
        }
    }
    // 通用请求错误处理
    private handleEerror(error: Response) {
        let errMsg = (error['message']) ? error['message'] :
        error.status ? `${error.status} - ${error.statusText}` : 'The system is busy. Try again later';
        if (error.ok == false) {
            errMsg = 'Network anomaly!';
        }
        return Observable.throw(errMsg);
    }

    // 获取api
    private getApiUrl(model: string) {
        if (!model) {
            throw 'UNKOWN API URL';
        }
        return this.config + model;
    }

    // get请求
    httpget(url: string, params?: any): Observable<T> {
        const param = params ? params : '';
        const api = this.getApiUrl(url) + param;
        return this.http.get(api, this.options).map(this.extractData).catch(this.handleEerror);
    }
    // post 请求
    httppost(url: string, params: any): Observable<T> {
        const api = this.getApiUrl(url);
        return this.http.post(api, params, this.options).map(this.extractData).catch(this.handleEerror);
    }
    // put 请求
    httpput(url: string, params: any): Observable<T> {
        const api = this.getApiUrl(url);
        return this.http.put(api, params, this.options).map(this.extractData).catch(this.handleEerror);
    }
    // delete 请求
    httpdelete (url: string, params: any): Observable<T> {
        const api = this.getApiUrl(url) + params;
        return this.http.delete(api)
          .map(this.extractData)
          .catch(this.handleEerror);
    }
}

