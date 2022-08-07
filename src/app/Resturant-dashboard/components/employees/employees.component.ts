import { AddKitchenComponent } from './../add-kitchen/add-kitchen.component';
import { WaiterDialogComponent } from './../waiter-dialog/waiter-dialog.component';
import { TokenStorageService } from './../../../shared/services/token-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  idRest: string = '';
 
  displayedColumns: string[] = [
    '_id',
    'name',
    'username',
    'phone',
    'address',
    'email',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listEmployeesWaiters = [];
  kitchenAccount: any;
  restaurantList!: Subscription;
  staffDelete!: Subscription;

  constructor(
    private TokenStorageService: TokenStorageService,
    private toastr: ToastrService,
    private RestaurantService: RestaurantDashboardService,
    public dialog: MatDialog
  ) {}
  loadRestaurantList() {
    this.restaurantList =
      this.RestaurantService.getListAllEmployers().subscribe({
        next: (data) => {
          console.log(data);
          this.listEmployeesWaiters = data.waiters;
          this.dataSource = new MatTableDataSource(this.listEmployeesWaiters);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.kitchenAccount = data.kitchen;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.idRest = this.TokenStorageService.getIdRest();
    console.log('this.idRest', this.idRest);
    this.loadRestaurantList();
  }

  editAccount(idEmployee: string) {
    this.staffDelete = this.RestaurantService.staffDelete(idEmployee).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.toastr.success("تم حذف الحساب بنجاح",data);
          this.loadRestaurantList();
        },
        error: (err) => {
          console.log(err);
          this.toastr.success("هناك خطاء في عملية الحذف",err);
        },
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addWaiter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      idRest: this.idRest,
    };
    const dialogRef = this.dialog.open(WaiterDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
     this.loadRestaurantList()
    });
  }
  addKitchen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      idRest: this.idRest,
      kitchenAccount: this.kitchenAccount.username,
    };
    const dialogRef = this.dialog.open(AddKitchenComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {

      this.loadRestaurantList()
    });
  }
  ngOnDestroy(): void {
    this.restaurantList.unsubscribe();
  
    if(this.staffDelete){
      this.staffDelete.unsubscribe()
    }
  }
}
