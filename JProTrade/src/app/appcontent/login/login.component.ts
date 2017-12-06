import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LoginApi, LoginInputType, ChangePasswordType } from '../../api/login';
import { CommonService } from '../../shared/common.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginApi] 
})
export class LoginComponent implements OnInit {
  user: LoginInputType = new LoginInputType();
  isdoallvalid = false;
  loginerror: boolean;
  errorMsg = '';
  msg: Message[] = [];
  constructor(
    private loginApi: LoginApi,
    private translateService: TranslateService,
    private commService: CommonService,
    private router: Router,
    private http: Http
  ) {
    this.translateService.addLangs(['zh', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.user.language = 'en';
    // console.log($('div'))
  }
  // login(ngform: any, e: any) {
  //   const jsonUrl = '../../../assets/i18n/' + this.translateService.currentLang + '.json';
  //   this.http.get(jsonUrl)
  //   .map( resp => resp.json())
  //   .subscribe( resp => {
  //     localStorage.removeItem('languageData');
  //     this.commService.localSave('languageData', resp);
  //     this.router.navigate(['/appcontent']);
  //   });
  // }
  login(ngform: any, e: any) {
    if (e.type === 'keyup' && e.code !== 'Enter') {
        return;
    }
    this.isdoallvalid = true;
    if (!ngform.form.valid) {
        return;
    }
    this.loginerror = false;
    // console.log(this.user);
    this.loginApi.login(this.user).subscribe(
      res => {
        // console.log(res);
        const jsonUrl = '../../../assets/i18n/' + this.translateService.currentLang + '.json';
        this.http.get(jsonUrl)
        .map( resp => resp.json())
        .subscribe( resp => {
          localStorage.removeItem('languageData');
          this.commService.localSave('languageData', resp);
          this.router.navigate(['/appcontent']);
        });
      },
      error => {
        // console.log(error);
        this.msg = this.commService.showInfo('error', 'Error Message', error);
        this.router.navigate(['/appcontent']);
      }
    );
  }
  changeLanguage() {
    // console.log(this.user.language);
    this.translateService.use(this.user.language);
  }
  // form 交互
  isValidate(element: any) {
      return !(element.valid || (element.pristine && !this.isdoallvalid));
  }
  clearerror() {
      this.errorMsg = '';
  }
}
