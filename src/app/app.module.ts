
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './shared/components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}
const materialComponent=[
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
