import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule1 } from '../../../shared/shared.module';
import { SysmenuComponent } from './sysmenu/sysmenu.component';
import { sysRoutes } from './sys.routes';
import { DropdownlistComponent } from './dropdownlist/dropdownlist.component';
import {
  FileUploadModule,
  DataTableModule,
  DropdownModule,
  RadioButtonModule,
  AutoCompleteModule,
  PaginatorModule,
  MultiSelectModule,
  CalendarModule
} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    SharedModule1,
    RouterModule.forChild(sysRoutes),
    FileUploadModule,
    DataTableModule,
    DropdownModule,
    RadioButtonModule,
    AutoCompleteModule,
    PaginatorModule,
    MultiSelectModule,
    CalendarModule
  ],
  declarations: [SysmenuComponent, DropdownlistComponent]
})
export class SysModule { }
