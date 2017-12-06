import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule1 } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { appcontentRoutes } from './appcontent.routes';
@NgModule({
  imports: [
    SharedModule1,
    RouterModule.forChild(appcontentRoutes)
  ],
  declarations: [LoginComponent],
  exports: [
  ]
})
export class AppcontentModule { }
