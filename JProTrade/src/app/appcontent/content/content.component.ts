import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApi } from '../../api/login';
import { CommonService } from '../../shared/common.service';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [LoginApi]
})
export class ContentComponent implements OnInit {
  msg: Message[] = [];
  constructor(
    private loginApi: LoginApi,
    private commService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this.loginApi.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      error => {
        this.msg = this.commService.showInfo('error', 'Error Message', error);
      }
    );
  }
}
