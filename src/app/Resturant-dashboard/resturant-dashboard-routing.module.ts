import { TaxesComponent } from './components/taxes/taxes.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RestaurantBillsComponent } from './components/restaurant-bills/restaurant-bills.component';
import { RestaurantTablesComponent } from './components/restaurant-tables/restaurant-tables.component';
import { ReservationsClientsComponent } from './components/reservations-clients/reservations-clients.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { InfoRestaurantComponent } from './components/info-restaurant/info-restaurant.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:BoardAdminComponent,children:[
    {path:'',component:InfoRestaurantComponent},
    {path:'Employees', component:EmployeesComponent},
    {path:'reservations', component:ReservationsClientsComponent},
    {path:'tables', component:RestaurantTablesComponent},
    {path:'menu', component:RestaurantMenuComponent},
    {path:'bills', component:RestaurantBillsComponent},
    {path:'taxes', component:TaxesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResturantDashboardRoutingModule { }
