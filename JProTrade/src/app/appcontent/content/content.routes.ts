import { Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
const ChildRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'chart', component: ChartComponent },
    {
        path: 'SYS',
        loadChildren: './SYS/sys.module#SysModule'
    },
    // {
    //     path: 'GL',
    //     loadChildren: './GL/GL.module#GLModule'
    // },
];
export const contentRoutes: Routes = [
    {
        path: '', component: ContentComponent,
        children: ChildRoutes
    }
];
