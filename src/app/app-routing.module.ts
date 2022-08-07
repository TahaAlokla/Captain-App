import { LoadRestaurantDashboardGuard } from './guards/load-restaurant-dashboard.guard';
import { HomeResturantComponent } from './core/components/home-resturant/home-resturant.component';
import { LoadAdminDashboardGuard } from './guards/load-admin-dashboard.guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeCaptainComponent } from './core/components/home-captain/home-captain.component';
import { Page404Component } from './core/components/page404/page404.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'home', component: HomeCaptainComponent
  },
  {
    path:'restaurant/:id/:Restaurant_name',component:HomeResturantComponent
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'captain-service',
    canLoad: [LoadAdminDashboardGuard],
    loadChildren: () => import('./captain-service-provider/captain.module').then(m => m.CaptainModule)
  },
  {
    path: 'restaurant-dashboard',
    canLoad: [LoadRestaurantDashboardGuard],
    loadChildren: () => import('./Resturant-dashboard/resturant-dashboard.module').then(m => m.ResturantDashboardModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
