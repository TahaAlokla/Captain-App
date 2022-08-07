import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminDashboardService } from './../../services/admin-dashboard.service';

import {Component, Inject ,OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation:ViewEncapsulation.None,
  providers: [DatePipe]
})
export class DialogComponent implements OnInit {
//  @Inject(MAT_DIALOG_DATA) public data: DialogData,
restaurantActivate:Subscription
restaurantDeactivate:Subscription
  constructor(public DatePipe:DatePipe ,private fb:FormBuilder, private toastr: ToastrService,private AdminDashboardService:AdminDashboardService,public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: { id: string,statusAccount:Boolean}
   ) { }

   minDate = new Date(new Date().setDate(new Date().getDate()));
   maxDate=new Date(new Date().setDate(new Date().getDate()+365));
  latest_date =this.DatePipe.transform(this.minDate, 'yyyy-MM-dd') as string;
// ,RxwebValidators.minDate({value:this.latest_date })
   expiration_date=new FormControl('',[Validators.required ])

  ngOnInit(): void {
    console.log(this.latest_date);
  }
  ngOnDestroy(): void {
    if(this.restaurantActivate){
      this.restaurantActivate.unsubscribe()
    }
    if(this.restaurantDeactivate){
      this.restaurantDeactivate.unsubscribe()
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getError() {
    return this.expiration_date?.invalid && (this.expiration_date?.touched || this.expiration_date?.dirty)
  }

  sendActiveAccount(statusAccount:Boolean,id:string){
    console.log("id restaurant", id);
    if(statusAccount){
      this.AdminDashboardService.restaurantDeactivate(id).subscribe({
        next:(data)=>{
          console.log(data);
          this.dialogRef.close();
          this.toastr.success(data.msg, "", {
            timeOut: 3000,
          })
        },error:(err)=>{
          console.log(err);
          this.toastr.error(err.error, "", {
            timeOut: 3000,
          })

        }
      })
    }else{
      let expiration_date= this.expiration_date.value as string
      this.AdminDashboardService.restaurantActivate(id,expiration_date).subscribe({
        next:(data)=>{
          console.log(data);
          this.dialogRef.close();
          this.toastr.success(data.msg, "", {
            timeOut: 3000,
          })
        },error:(err)=>{
          console.log(err);
          this.toastr.error(err.err, "", {
            timeOut: 3000,
          })

        }
      })

    }

  }
}
