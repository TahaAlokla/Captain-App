import { InfoRestaurantComponent } from './components/info-restaurant/info-restaurant.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:BoardAdminComponent,children:[
    {path:'',component:InfoRestaurantComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResturantDashboardRoutingModule { }
