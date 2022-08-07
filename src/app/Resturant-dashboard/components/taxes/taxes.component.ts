import { AddTaxComponent } from './../add-tax/add-tax.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  submit=false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listTaxes!: Subscription;
  deleteTaxSub!:Subscription;
  allTaxes = []
  deleteTaxBtn=false
  displayedColumns: string[] = [
    '_id',
    'name',
    'type',
    'value',
    'action',
  ];
  constructor(private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService, public dialog: MatDialog,) { }

  loadAllTaxes() {
   
    this.listTaxes = this.RestaurantService.getAllTaxes().subscribe({
      next: (data) => {
        
        console.log(data);
        this.allTaxes = data.taxes
        this.dataSource = new MatTableDataSource(this.allTaxes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
       
        console.log(err);

      }
    })
  }

  ngOnInit(): void {

    this.loadAllTaxes()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTaxes(status: string, taxObject?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      // addTax
      status:status,
      taxObject: taxObject,
    };
    const dialogRef = this.dialog.open(AddTaxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      this.loadAllTaxes()
    });

  }

  deleteTax(idTax:string){
    this.deleteTaxBtn= true
   this.deleteTaxSub= this.RestaurantService.deleteTax(idTax).subscribe({
      next:(data)=>{
        this.deleteTaxBtn= false
        console.log(data);
        this.toastr.success("تم حذف الضريبة",data.msg)
        this.loadAllTaxes()
      },error:(err)=>{
        this.deleteTaxBtn= false
        console.log(err);
        this.toastr.error("هنك مشكلة في حذف الضريبة",err.error.msg)
        
      }
    })

  }

  ngOnDestroy(): void {
   this.listTaxes.unsubscribe()
   if(this.deleteTaxSub){
    this.deleteTaxSub.unsubscribe()
   }
  }

}
