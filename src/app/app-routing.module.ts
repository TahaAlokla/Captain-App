import { LoginComponent } from './shared/components/login/login.component';
import { HomeCaptainComponent } from './core/components/home-captain/home-captain.component';
import { Page404Component } from './core/components/page404/page404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',component:HomeCaptainComponent
  },
  {path:'login', component:LoginComponent},
 {path:'captain-service',loadChildren: () => import('./captain-service-provider/captain.module').then(m => m.CaptainModule)},
 {path:'' , redirectTo:'/home',pathMatch:'full'},
 {path:'**',component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
