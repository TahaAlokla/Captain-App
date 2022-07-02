import { DialogComponent } from './../dialog/dialog.component';
import { map, Subscription } from 'rxjs';
import { AdminDashboardService } from './../../services/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-resturant-clients',
  templateUrl: './resturant-clients.component.html',
  styleUrls: ['./resturant-clients.component.scss']
})
export class ResturantClientsComponent implements OnInit {
  moment: any = moment;
  displayedColumns: string[] = ['id', 'name', 'username', 'phone', 'address', 'createdAt', 'expiration_date', 'active'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private AdminService: AdminDashboardService, public dialog: MatDialog) { }
  listRestaurant: any
  restaurantList!: Subscription;
  loadRestaurantList() {
    this.restaurantList = this.AdminService.getRestaurantList().subscribe({
      next: (data) => {
        // console.log(data.restaurants);
        this.listRestaurant = data.restaurants.map((item: any) => {

          return { ...item }
        })
        console.log(this.listRestaurant);
        this.dataSource = new MatTableDataSource(this.listRestaurant);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error: (err) => {
        console.log(err);
      }
    })

  }
  ngOnInit(): void {
    this.loadRestaurantList()

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRestaurantAccount(statusAccount: boolean, id: string) {
    console.log("status : ", statusAccount, "id:", id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    dialogConfig.data = {
      id: id, statusAccount: statusAccount
    }
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadRestaurantList()
    });

  }
  ngOnDestroy(): void {
    this.restaurantList.unsubscribe()
  }

}
