import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';
@Injectable()
export class CommonService {
  msgs: Message[] = [];
  constructor() { }
  // localStorage本地存储
  localSave(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  localGet(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  // 时间格式化
  format(pattern: string, value?: Date) {
    this._prototype();
    if (!value) {
      value = new Date();
    }
    return value['format'](pattern);
  }
  private _prototype() {
    if (Date.prototype['format']) {
      return;
    }
    Date.prototype['format'] = function (format) {
      const o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        'S': this.getMilliseconds() // millisecond
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
      }
      if (format === 'null') {
        format = '';
      }
      return format;
    };
  }
  // 提示显示
  showInfo(severity: string, summary: string, detail: string): Message[] {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
    return this.msgs;
  }
}
