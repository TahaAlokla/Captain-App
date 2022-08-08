import { BillDetailsComponent } from './../bill-details/bill-details.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-restaurant-bills',
  templateUrl: './restaurant-bills.component.html',
  styleUrls: ['./restaurant-bills.component.scss']
})
export class RestaurantBillsComponent implements OnInit {
  billList: Subscription
  bills=[]
  displayedColumns: string[] = [
    '_id',
    'waiterName',
    'tableNumber',
    'total',
    'action',
  ];
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, ];
  // dataSource!: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private RestaurantService: RestaurantDashboardService,public dialog: MatDialog) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log("change page " ,this.currentPage);

    this.loadData();
  }
  loadData(){
    console.log("currentpage", this.currentPage);
// this.currentPage
    this.billList = this.RestaurantService.getBillList( this.currentPage).subscribe({
      next: (data) => {
        console.log("data from back",data);
        this.bills = data.bills;
        this.dataSource.data = this.bills
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = data.count;
        });
        // this.dataSource = new MatTableDataSource(this.bills);
        // this.dataSource.paginator = this.paginator;
        // this.paginator.pageIndex = this.currentPage;

        // this.paginator.pageIndex = this.currentPage;
        // this.dataSource.sort = this.sort;
        // this.totalRows = data.count

      },error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.loadData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  billDetails(idBill:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      idBill: idBill,
    };
    const dialogRef = this.dialog.open(BillDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);

    });

  }
  ngOnDestroy(): void {
    this.billList.unsubscribe()

  }

}
