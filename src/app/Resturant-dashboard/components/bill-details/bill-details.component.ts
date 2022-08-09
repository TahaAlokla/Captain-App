import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
getBillDetails:Subscription
msg:boolean = true
dishes=[]
taxes=[]
BillDetails:any
  constructor(private RestaurantService: RestaurantDashboardService,public dialogRef: MatDialogRef<any>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { idBill: string }) { }
LoadData(){
  this.getBillDetails = this.RestaurantService.getBillDetails(this.data.idBill).subscribe({
    next:(data)=>{
      this.msg = false

      console.log(data);
      this.BillDetails= data.bill
      this.dishes = data.bill.dishes
      this.taxes=data.bill.taxes
      this.cdr.detectChanges();

    },error:(err)=>{
      console.log(err);

    }
  })
}

  ngOnInit(): void {
    this.LoadData()
  }
  ngOnDestroy(): void {
    this.getBillDetails.unsubscribe()

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
