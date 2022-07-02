import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantDashboardRoutingModule } from './resturant-dashboard-routing.module';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';


@NgModule({
  declarations: [
    BoardAdminComponent
  ],
  imports: [
    CommonModule,
    ResturantDashboardRoutingModule
  ]
})
export class ResturantDashboardModule { }
