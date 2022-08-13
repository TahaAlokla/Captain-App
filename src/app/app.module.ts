import { MatIconModule } from '@angular/material/icon';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Page404Component } from './core/components/page404/page404.component';
import { HomeCaptainComponent } from './core/components/home-captain/home-captain.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FooterHomeComponent } from './shared/components/footer-home/footer-home.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './shared/components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SwiperModule } from 'swiper/angular';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { HomeResturantComponent } from './core/components/home-resturant/home-resturant.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConvertTime12HoursPipe } from './shared/pipes/convert-time12-hours.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthInterceptor } from './_helper/auth.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}
const materialComponent=[
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
  // MAT_DATE_LOCALE
]
const timePicker=[
  NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,

]

const services=[

]
@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    HomeCaptainComponent,
    NavbarComponent,
    FooterHomeComponent,
    LoginComponent,
    HomeResturantComponent,
    ConvertTime12HoursPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   ReactiveFormsModule,
   RxReactiveFormsModule,
   SwiperModule,
   MatTabsModule,
   ...timePicker,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
    SweetAlert2Module.forRoot(),
    ...materialComponent,

  TranslateModule.forRoot({
    defaultLanguage: 'ar',
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient],
    }
  }),

  BrowserAnimationsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ar' }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
