import { AddMealComponent } from './../add-meal/add-meal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listCategory!: Subscription;
  allCategory = []
  displayedColumns: string[] = [
    '_id',
    'name',
    'description',
    'categories',
    'price',
    'imageUrl',
    'updatedAt',
    'action'
  ];
  constructor(private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService, public dialog: MatDialog,) { }

    loadAllCategory(){
      this.listCategory=this.RestaurantService.getListCategory().subscribe({
         next:(data)=>{
          console.log(data);
          this.allCategory= data
          
         }
      })
    }

    changeCategory($event){

    }

  ngOnInit(): void {
    this.loadAllCategory()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteMeal(idMeal){
  }


  addMeal(status?:string,mealObj?:any){
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

  ngOnDestroy(): void {
    this.listCategory.unsubscribe()
    
  }

}
