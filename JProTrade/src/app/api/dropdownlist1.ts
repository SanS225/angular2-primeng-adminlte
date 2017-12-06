import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { BaseApi } from './baseApi';
export class BaseOutType {
    status: string;
    msg: string;
    data: any;
    page: any;
}
export class AddDdlType {
    ddDdlId: string;
    ddDdlName: string;
    ddDdlDescription: string;
    ddDdlValue: string;
    ddDdlValueDescription: string;
    ddDdlValueAltDescription: string;
    ddDdlGroup: string;
    ddDdlTag: string;
    ddDdlValueInactiveFlag: string;
    ddDdlValueStartDate: string;
    ddDdlValueEndDate: string;
}
export class UpdateDdlType {
    ddDdlId: string;
    ddDdlName: string;
    ddDdlDescription: string;
    ddDdlValue: string;
    ddDdlValueDescription: string;
    ddDdlValueAltDescription: string;
    ddDdlGroup: string;
    ddDdlTag: string;
    ddDdlValueInactiveFlag: string;
    ddDdlValueStartDate: string;
    ddDdlValueEndDate: string;
}
export class SearchInputType {
    ddDdlName: string;
    ddDdlDescription: any;
    page: PageType;
}
export class DropdownlistType {
    ddDdlId: string;
    ddDdlName: string;
    ddDdlDescription: any;
    ddDdlValue: string;
    ddDdlValueDescription: string;
    ddDdlValueAltDescription: string;
    ddDdlGroup: string;
    ddDdlTag: string;
    ddDdlValueInactiveFlag: string;
    ddDdlValueStartDate: any;
    ddDdlValueEndDate: any;

}
export class PageType {
    totalCount: any;
    pageSize: any;
    startRow: any;
}
@Injectable()
export class DropdownlistApi extends BaseApi<any> {
    constructor( @Inject(Http) http) {
        super(http);
    }
    search(params: SearchInputType): Observable<BaseOutType> {
        return this.httppost('sys/dropDownLists/search', params);
    }
    add(params: AddDdlType): Observable<BaseOutType> {
        return this.httppost('sys/dropDownLists', params);
    }
    update(params: UpdateDdlType): Observable<BaseOutType> {
        return this.httpput('sys/dropDownLists', UpdateDdlType);
    }
    delete(params: string): Observable<BaseOutType> {
        return this.httpdelete('/sys/dropDownLists/', params);
    }
    getUploadUrl() {
        return this.config + 'sys/dropDownLists/upload';
    }
    getName(): Observable<BaseOutType> {
       return this.httpget('sys/dropDownLists/name');
    }
    getDescription(): Observable<BaseOutType> {
        return this.httpget('sys/dropDownLists/descption');
    }
    export(params: SearchInputType): Observable<BaseOutType> {
        return this.httppost('sys/dropDownLists/export', params);
    }
}
