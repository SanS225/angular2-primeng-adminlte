import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateHttpLoader(http: Http) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
import { appRoutes } from './app.routes';
import { AppcontentModule } from './appcontent/appcontent.module';
import { AppComponent } from './app.component';
import { CommonService } from './shared/common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    TranslateModule.forRoot({
          loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateHttpLoader),
          deps: [Http]
        }
      }),
    RouterModule.forRoot(appRoutes),
    AppcontentModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
