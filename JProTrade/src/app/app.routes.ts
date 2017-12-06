import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './appcontent/appcontent.module#AppcontentModule'
  },
  {
    path: '**',
    loadChildren: './appcontent/appcontent.module#AppcontentModule'
  }
];
