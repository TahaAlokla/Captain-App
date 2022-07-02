import { AddSubscribeToResturantComponent } from './../add-subscribe-to-resturant/add-subscribe-to-resturant.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDashboardService } from './../../services/admin-dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-subscribe-resturant',
  templateUrl: './subscribe-resturant.component.html',
  styleUrls: ['./subscribe-resturant.component.scss']
})
export class SubscribeResturantComponent implements OnInit {
  // subscribtionRestauran:Subscription
//, 'name',  'phone', 'address', 'Status', 'createdAt'
  displayedColumns: string[] = ['id','name',  'phone', 'address', 'status', 'createdAt'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;
  restaurantList!:Subscription;
  constructor(private AdminService: AdminDashboardService ,public dialog: MatDialog) { }
  subscribeListRestaurant: any
  loadSubscribeClients(){
    this.restaurantList=  this.AdminService.getSubscribedRestaurant().subscribe({
      next: (data) => {
        // console.log(data.subscriptions);
        this.subscribeListRestaurant = data.subscriptions
        this.dataSource = new MatTableDataSource(this.subscribeListRestaurant);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.loadSubscribeClients()
  }
  addSubscToRestaurant(idSubscribeClient:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    dialogConfig.data = {
      id: idSubscribeClient,
    }
    const dialogRef = this.dialog.open(AddSubscribeToResturantComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadSubscribeClients()
    });

  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.restaurantList.unsubscribe()
  }
}
