import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations-clients',
  templateUrl: './reservations-clients.component.html',
  styleUrls: ['./reservations-clients.component.scss'],
})
export class ReservationsClientsComponent implements OnInit {
  moment: any = moment;
  ReservationSubmit=false
  getListReservations!: Subscription;
  rejectReservation!: Subscription;
  displayedColumns: string[] = [
    '_id',
    'name',
    'status',
    'phone',
    'numberTable',
    'dateOfReservation',
    'note',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listReservations: any;
  constructor(
    private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService
  ) {}
  

  loadListReservations() {
    this.getListReservations =
      this.RestaurantService.getListReservations().subscribe({
        next: (data) => {
          console.log('data getListReservations', data);
          this.listReservations = data.onlineReservaion;

          this.dataSource = new MatTableDataSource(this.listReservations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
  }
  cancelReservation(ReservationId: string) {
    this.ReservationSubmit=true
    this.rejectReservation = this.RestaurantService.rejectReservation(
      ReservationId
    ).subscribe({
      next: (data) => {
        this.ReservationSubmit=false
        console.log(data);
        this.toastr.success('تم حذف الطلب بنجاح', data.msg);
        this.loadListReservations();
      },
      error: (err) => {
        this.ReservationSubmit=false
        console.log(err);
        this.toastr.error('هناك مشكلة في حذف الطلب', err.error.msg);
      },
    });
  }
  acceptReservation(ReservationId: string ,status:string) {
    this.ReservationSubmit=true

    this.rejectReservation = this.RestaurantService.acceptReservation(
      ReservationId
    ).subscribe({
      next: (data) => {
        this.ReservationSubmit=false
        console.log(data.msg);
        this.toastr.success('تم قبول الحجز بنجاح', data.msg);
        this.loadListReservations();
      },
      error: (err) => {
        this.ReservationSubmit=false
        console.log(err);
        this.toastr.error('هناك مشكلة في قبول الطلب', err.error.msg);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.loadListReservations();
  }

  ngOnDestroy(): void {
   
    if(this.getListReservations){
      this.getListReservations.unsubscribe()
    }
    // if(this.rejectReservation){
    //   this.rejectReservation.unsubscribe()
    // }
  }
}
