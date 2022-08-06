import { AddCategoryComponent } from './../add-category/add-category.component';
import { AddMealComponent } from './../add-meal/add-meal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, Observable, Subscription, tap } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
const { baseUrl } = environment;
@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss'],
})
export class RestaurantMenuComponent implements OnInit {
  imageBaseUrl = `${baseUrl}`;
  dataSource!: MatTableDataSource<any>;
  dataSourceCategory!: MatTableDataSource<any>;
  // dataSourceCategory:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('MatPaginator1') MatPaginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // listCategory!: Subscription;
  listAllMealsForCategory!: Subscription;

  allCategory: Observable<any>;
  displayedColumns: string[] = [
    '_id',
    'name',
    'description',
    'price',
    'imageUrl',
    'updatedAt',
    'action',
  ];

  displayedColumnsCategory: string[] = ['_id', 'name', 'updatedAt', 'action'];
  constructor(
    private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  //   formControlName="type"
  choiceCategory = new FormControl('');

  listCategory!: Observable<Array<any>>;
  loadAllCategory() {
    this.listCategory = this.RestaurantService.getListCategory().pipe(
      tap((data) => {
        console.log('tap data', data);
        this.choiceCategory.setValue(data[0]._id);
        this.loadAllMeas(this.choiceCategory.value as string);
      })
    );
  }

  loadAllMeas(categoryId: string) {
    this.listAllMealsForCategory = this.RestaurantService.getListMeals(
      categoryId
    ).subscribe({
      next: (data) => {
        console.log('data all meals for category', data.length);
        console.log('id cat', categoryId);

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
        this.dataSource = new MatTableDataSource([]);
      },
    });
  }

  ngAfterViewInit(): void {
    // console.log(" this.choiceCategory", this.choiceCategory.value);
    // this.choiceCategory
  }

  addCategory(status?: string, categoryObj?: any) {
    // 'addCategory'
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      // addTax
      status: status,
      categoryObj: categoryObj,
    };
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      // this.loadAllCategory();
      this.listEditCategory();
    });
  }
  listEditCategory() {
    this.RestaurantService.getListCategory().subscribe({
      next: (data) => {
        console.log('data category', data.length, data);
        let listCategory = data;
        this.dataSourceCategory = new MatTableDataSource(listCategory);
        this.dataSourceCategory.paginator = this.MatPaginator1;
        this.dataSourceCategory.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
        // this.dataSourceCategory = new MatTableDataSource([]);
      },
    });
  }
  changeCategory($event) {
    console.log(this.choiceCategory.value);
    this.loadAllMeas(this.choiceCategory.value);
  }

  ngOnInit(): void {
    this.loadAllCategory();
    this.listEditCategory();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCategory.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceCategory.paginator) {
      this.dataSourceCategory.paginator.firstPage();
    }
  }
  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  deleteMeal(idMeal: string, idCategory: string) {
    this.RestaurantService.DeleteMale(idMeal).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success('تم حذف الوجبة بنجاح', data.msg);
        this.loadAllMeas(idCategory);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('هناك خطاء ما', err.error.msg);
      },
    });
  }

  addMeal(status: string, mealObj?: any, idCategory?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      // addTax
      status: status,
      mealObj: mealObj,
    };
    const dialogRef = this.dialog.open(AddMealComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (status === 'addMeal') {
        this.loadAllCategory();
      } else {
        this.loadAllMeas(idCategory);
      }
    });
  }

  ngOnDestroy(): void {
    // this.listCategory.unsubscribe();
  }
}
