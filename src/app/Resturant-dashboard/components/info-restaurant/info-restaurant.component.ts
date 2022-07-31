import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RestaurantDashboardService } from './../../services/restaurant-dashboard.service';
import { TokenStorageService } from './../../../shared/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogInfoRestoComponent } from '../dialog-info-resto/dialog-info-resto.component';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;
@Component({
  selector: 'app-info-restaurant',
  templateUrl: './info-restaurant.component.html',
  styleUrls: ['./info-restaurant.component.scss'],
})
export class InfoRestaurantComponent implements OnInit {
  restaurantInfoData: any;
  imageBaseUrl=`${baseUrl}`
  constructor(
    private TokenStorageService: TokenStorageService,
    private RestaurantService: RestaurantDashboardService,
    private router:Router,
    public dialog: MatDialog
  ) {}

  EditSubmitRestaurant() {}

  ngOnInit(): void {
    this.restaurantInfoData = this.TokenStorageService.getUser();
    console.log(this.restaurantInfoData);
    this.TokenStorageService.saveIdRest(this.restaurantInfoData._id);
    this.RestaurantService.postRestaurantsDetail(
      this.restaurantInfoData._id
    ).subscribe({
      next: (data) => {
        this.restaurantInfoData = data.restaurant;
        //  console.log(this.restaurantInfoData.address);
        this.imageBaseUrl =`${baseUrl}/${data.restaurant.avatar}`

        console.log(this.restaurantInfoData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editRestaurantInfo(id: string) {
    console.log('id:', id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      id: id,
    };
    const dialogRef = this.dialog.open(DialogInfoRestoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.ngOnInit()
      // this.loadRestaurantList()
    });
  }

  goToHomeRest(idRest, nameRest){
    this.router.navigate(['restaurant', idRest,nameRest]);
  }
}
