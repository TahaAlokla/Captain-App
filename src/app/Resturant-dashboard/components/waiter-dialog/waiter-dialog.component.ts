import { Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-waiter-dialog',
  templateUrl: './waiter-dialog.component.html',
  styleUrls: ['./waiter-dialog.component.scss']
})
export class WaiterDialogComponent implements OnInit {
  hide: boolean = true
  postCreateWaiter:Subscription
  submit=false
  constructor(private RestaurantService: RestaurantDashboardService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { idRest: string }) { }

  ngOnInit(): void {
  }

  registerWaiter = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/),]]
  });
  getError(controlName: string) {
    return this.registerWaiter.get(controlName)?.invalid && (this.registerWaiter.get(controlName)?.touched || this.registerWaiter.get(controlName)?.dirty)
  }

  registerWaiterSubmit() {
    this.submit=true
    let idRest = this.data.idRest;
    let registerWaiterData = {
      name: this.registerWaiter.value.name as string,
      username: this.registerWaiter.value.username as string,
      password: this.registerWaiter.value.password as string,
      confirmationPassword: this.registerWaiter.value.password as string,
      address: this.registerWaiter.value.address as string,
      phone: this.registerWaiter.value.phone as string,
      email: this.registerWaiter.value.email as string
      // * الله يوفقك , وحنا الله يوفقنا !
      // * 1/8/2022 - 11pm
    }
    console.log(registerWaiterData, idRest );

  this.postCreateWaiter=  this.RestaurantService.postCreateWaiter(registerWaiterData, idRest).subscribe({
      next:(data)=>{
        this.submit=false
        console.log(data);
        this.toastr.success('تم أضافة الموظف بنجاح')
        this.registerWaiter.reset()
        this.dialogRef.close();
      },error:(err)=>{
        this.submit=false
        console.log(err);
        this.toastr.error('هناك خطاء في اضافة بيانات الموظف',err.error)
      }
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
   if(this.postCreateWaiter){
    this.postCreateWaiter.unsubscribe()
   }
    
  }
  /*
   
  */

}
