import { Subscription } from 'rxjs';
import { AdminDashboardService } from './../../services/admin-dashboard.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-subscribe-to-resturant',
  templateUrl: './add-subscribe-to-resturant.component.html',
  styleUrls: ['./add-subscribe-to-resturant.component.scss']
})
export class AddSubscribeToResturantComponent implements OnInit {
  SubmitStatus:boolean=false
postSubscribe!:Subscription
  constructor(private fb:FormBuilder, private toastr: ToastrService,private AdminDashboardService:AdminDashboardService,public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: { id: string}) { }
  minDate = new Date(new Date().setDate(new Date().getDate()));
  maxDate=new Date(new Date().setDate(new Date().getDate()+365));
  hide:Boolean=true
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    if(this.postSubscribe){
      this.postSubscribe.unsubscribe()
    } 
  }

  registerSubscribe = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    expiration_date: ['', [Validators.required]]
  })
  getError(controlName: string) {
    return this.registerSubscribe.get(controlName)?.invalid && (this.registerSubscribe.get(controlName)?.touched || this.registerSubscribe.get(controlName)?.dirty)
  }

  subscribeForm(id:string){
    this.SubmitStatus=true
    if(this.registerSubscribe.invalid){
      return;
    }else{
      let subscribeData={
        id:id,
        username:this.registerSubscribe.value.username as string,
        password:this.registerSubscribe.value.password as string,
        expiration_date:this.registerSubscribe.value.expiration_date as string
      }
      this.postSubscribe = this.AdminDashboardService.postAcceptRestaurant(subscribeData).subscribe({
        next:(data)=>{
          console.log(data);
          this.SubmitStatus=false
          this.dialogRef.close();
          this.toastr.success(data.msg, "", {
            timeOut: 3000,
          })
        }, error:(err)=>{
          this.SubmitStatus=false
          console.log(err);
          this.toastr.error("", err.err, {
            timeOut: 3000,
          })

        }
      })

    }

  }
}
