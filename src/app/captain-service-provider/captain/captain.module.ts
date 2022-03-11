import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptainRoutingModule } from './captain-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
const components=[
  HomeComponent
]

@NgModule({
  declarations: [... components],
  imports: [
    CommonModule,
    CaptainRoutingModule,
    SharedModule
  ]
})
export class CaptainModule { }
