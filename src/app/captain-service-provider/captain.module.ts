import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptainRoutingModule } from './captain-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
import { AddResturantComponent } from './components/add-resturant/add-resturant.component';
import { ToastrModule } from 'ngx-toastr';
import { SubscribeResturantComponent } from './components/subscribe-resturant/subscribe-resturant.component';
import { ResturantClientsComponent } from './components/resturant-clients/resturant-clients.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './components/profile/profile.component';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DialogComponent } from './components/dialog/dialog.component';
// import {MatDividerModule} from '@angular/material/divider';
import { AddSubscribeToResturantComponent } from './components/add-subscribe-to-resturant/add-subscribe-to-resturant.component';
// const materialComponent = [
//   MatSidenavModule,
//   MatMomentDateModule,
//   MatDividerModule,
//   MatDialogModule,
//   MatDatepickerModule,
//   MatListModule,
//   MatButtonModule,
//   MatFormFieldModule,
//   MatCardModule,
//   MatIconModule,
//   MatInputModule,
//   MatTableModule,
//   MatPaginatorModule
// ]
const component = [
  HomeComponent,
  HeaderComponent
  , FooterComponent
]
const services = [
  AdminDashboardService
]
@NgModule({
  declarations: [...component, AddResturantComponent, SubscribeResturantComponent, ResturantClientsComponent, AdminBoardComponent, ProfileComponent, DialogComponent, AddSubscribeToResturantComponent],
  imports: [
    CommonModule,
    CaptainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // ...materialComponent,
    ToastrModule
  ],

  providers: [
    ...services,


  ]
  /*
  يارب تهون على قلب موجوع
  */
})
export class CaptainModule { }
