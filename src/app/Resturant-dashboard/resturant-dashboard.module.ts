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
import { EmployeesComponent } from './components/employees/employees.component';
import { WaiterDialogComponent } from './components/waiter-dialog/waiter-dialog.component';
import { ReservationsClientsComponent } from './components/reservations-clients/reservations-clients.component';
import { RestaurantTablesComponent } from './components/restaurant-tables/restaurant-tables.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RestaurantBillsComponent } from './components/restaurant-bills/restaurant-bills.component';
import { AddKitchenComponent } from './components/add-kitchen/add-kitchen.component';
import { TableInputAddComponent } from './components/table-input-add/table-input-add.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { AddTaxComponent } from './components/add-tax/add-tax.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
const service=[
  RestaurantDashboardService
]
@NgModule({
  declarations: [
    BoardAdminComponent,
    InfoRestaurantComponent,
    DialogInfoRestoComponent,
    Time12hoursPipe,
    EmployeesComponent,
    WaiterDialogComponent,
    ReservationsClientsComponent,
    RestaurantTablesComponent,
    RestaurantMenuComponent,
    RestaurantBillsComponent,
    AddKitchenComponent,
    TableInputAddComponent,
    TaxesComponent,
    AddTaxComponent,
    AddMealComponent
  ],
  imports: [
    CommonModule,
    ResturantDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers:[
    ...service
  ]
})
export class ResturantDashboardModule { }
