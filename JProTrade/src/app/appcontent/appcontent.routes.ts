import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appcontentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'appcontent',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'appcontent',
    loadChildren: './content/content.module#ContentModule'
  }
];
