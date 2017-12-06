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
export class LoginInputType {
    urId: string;
    urPassword: string;
    language: string;
}
export class ChangePasswordType {
    oldPassword: string;
    newPassword: string;
    reNewPassword: string;
    urId: string;
}
@Injectable()
export class LoginApi extends BaseApi<any> {
    constructor( @Inject(Http) http) {
        super(http);
    }
    login(params: LoginInputType): Observable<BaseOutType> {
        return this.httppost('api/user/login', params);
    }
    logout(): Observable<BaseOutType> {
        return this.httpget('api/user/logout');
    }
    changePwd(params: ChangePasswordType): Observable<BaseOutType> {
        return this.httpput('api/user/changePassword', params);
    }
}
