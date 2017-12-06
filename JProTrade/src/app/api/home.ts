import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { BaseApi } from './baseApi';

export class BaseOutType {
    status: string;
    msg: string;
    data: string;
    page: string;
}
export class SharesType {
    GId: string;
    GAllName: string;
    Gcode: string;
    Gname: string;
    Glevel: string;
    Gdate: string;
    Recommender: string;
    Gfile: string;
}

@Injectable()
export class HomeApi extends BaseApi<any> {
    constructor( @Inject(Http) http) {
        super(http);
    }
    getdata(): Observable<BaseOutType> {
        return this.httpget('ksb_data/?svc_code=IPM_A02_0950&params=20171206|10&uid=8e7fb1197084e10f');
    }
}
