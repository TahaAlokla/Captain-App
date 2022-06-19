import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptainRoutingModule } from './captain-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';

const component=[
  HomeComponent,
  HeaderComponent
  , FooterComponent
]
@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    CaptainRoutingModule,
    SharedModule
  ]
})
export class CaptainModule { }
