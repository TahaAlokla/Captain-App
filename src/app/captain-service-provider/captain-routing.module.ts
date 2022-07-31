import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { ResturantClientsComponent } from './components/resturant-clients/resturant-clients.component';
import { SubscribeResturantComponent } from './components/subscribe-resturant/subscribe-resturant.component';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent
    , children: [
      {
        path: '', component: AddResturantComponent
      },
      {
        path:'subscribe-rest',component:SubscribeResturantComponent
      },
      {
        path:'restaurant-clients',component:ResturantClientsComponent
      },
      {
        // for super admin
        path:'admin-board',component:AdminBoardComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptainRoutingModule { }
