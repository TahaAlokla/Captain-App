import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subscription } from 'rxjs';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-category-list-edit',
  templateUrl: './category-list-edit.component.html',
  styleUrls: ['./category-list-edit.component.scss']
})
export class CategoryListEditComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   listCategory!: Subscription;
  
  allCategory :Observable<any>;
  displayedColumnsCategory: string[] = [
    '_id',
    'name',
    'updatedAt',
    'action',
  ];
  constructor( private RestaurantService: RestaurantDashboardService,
    ) { }

  ngOnInit(): void {
  }

}
