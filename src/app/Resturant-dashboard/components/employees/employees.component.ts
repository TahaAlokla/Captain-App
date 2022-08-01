import { WaiterDialogComponent } from './../waiter-dialog/waiter-dialog.component';
import { TokenStorageService } from './../../../shared/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  idRest: string = ''
  constructor(private TokenStorageService: TokenStorageService,
    private RestaurantService: RestaurantDashboardService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.idRest = this.TokenStorageService.getIdRest()
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
      console.log('The dialog was closed', result);
      // this.ngOnInit()

    });

  }

}
