import { TableInputAddComponent } from './../table-input-add/table-input-add.component';
import { Observable, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-restaurant-tables',
  templateUrl: './restaurant-tables.component.html',
  styleUrls: ['./restaurant-tables.component.scss']
})
export class RestaurantTablesComponent implements OnInit {
  getAllTables!:Subscription
  AllTables:any
  // getAllTables :Observable<Array<any>>
  constructor( private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService , public dialog: MatDialog,private cdr: ChangeDetectorRef) { }

    loadAllTables(){
      this.getAllTables= this.RestaurantService.getAllTables()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.AllTables= data
          this.cdr.detectChanges();

        },error:(err)=>{
          console.log(err);
        }
      })

    }

  ngOnInit(): void {
    this.loadAllTables()

  }
  addTables(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      // * يالله يا جابر خواطر القلوب ! 
      // * قصدناك بقلب من الدنيا تعوب 
      // * زيح عنه تلال الهموم الي فوق الصدر 
       tablesNumber: this.AllTables?.length,
    };
    const dialogRef = this.dialog.open(TableInputAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      this.loadAllTables()

    });

  }
  ngOnDestroy(): void {
    // this.getAllTables.unsubscribe()

  }

}
