import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule1 } from '../../shared/shared.module';

import { ContentComponent } from './content.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { SideComponent } from './side/side.component';
import { contentRoutes } from './content.routes';
import { AutoCompleteModule, ChartModule, PaginatorModule, FileUploadModule, SharedModule, SelectItem, InputTextModule, DropdownModule, ButtonModule, DataTableModule, DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    SharedModule1,
    RouterModule.forChild(contentRoutes),
    AutoCompleteModule,
    DropdownModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    PaginatorModule,
    InputTextModule,
    FileUploadModule,
    SharedModule,
    ChartModule,
  ],
  declarations: [ContentComponent, HomeComponent,ChartComponent, SideComponent]
})
export class ContentModule { }
