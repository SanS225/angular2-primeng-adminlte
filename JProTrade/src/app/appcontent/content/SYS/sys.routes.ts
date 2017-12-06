import { Routes } from '@angular/router';
import { SysmenuComponent } from './sysmenu/sysmenu.component';
import { DropdownlistComponent } from './dropdownlist/dropdownlist.component';
export const sysRoutes: Routes = [
    {path: '', redirectTo: 'sysmenu', pathMatch: 'full'},
    {path: 'sysmenu', component: DropdownlistComponent},
    {path: 'dropdownlist', component: DropdownlistComponent},
    {path: '**', redirectTo: 'sysmenu', pathMatch: 'full'},
];
