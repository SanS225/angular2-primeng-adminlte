import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule} from '@angular/forms';
import {
  GrowlModule
} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    GrowlModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    GrowlModule,
  ]
})
export class SharedModule1 { }
