import { AddMealComponent } from './../add-meal/add-meal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {

  constructor(private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addMeal(status?:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      // addTax
      status:status,
      // taxObject: taxObject,
    };
    const dialogRef = this.dialog.open(AddMealComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      
    });

  }

}
