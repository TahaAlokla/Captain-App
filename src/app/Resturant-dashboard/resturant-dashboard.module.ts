import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResturantDashboardRoutingModule } from './resturant-dashboard-routing.module';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { InfoRestaurantComponent } from './components/info-restaurant/info-restaurant.component';
import { RestaurantDashboardService } from './services/restaurant-dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { DialogInfoRestoComponent } from './components/dialog-info-resto/dialog-info-resto.component';
import { Time12hoursPipe } from './pipes/time12hours.pipe';

const service=[
  RestaurantDashboardService
]
@NgModule({
  declarations: [
    BoardAdminComponent,
    InfoRestaurantComponent,
    DialogInfoRestoComponent,
    Time12hoursPipe
  ],
  imports: [
    CommonModule,
    ResturantDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  providers:[
    ...service
  ]
})
export class ResturantDashboardModule { }
