import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.scss']
})
export class AddKitchenComponent implements OnInit {
  hide:boolean=true
  constructor(private RestaurantService: RestaurantDashboardService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { idRest: string ,kitchenAccount:string}) { }

  ngOnInit(): void {
  }
  AddKitchen= this.fb.group({
    username:[this.data.kitchenAccount,[Validators.required]],
    password:['',[Validators.required]]
  })

  getError(controlName: string) {
    // this.AddKitchen.get(controlName)?.touched ||
    return this.AddKitchen.get(controlName)?.invalid && ( this.AddKitchen.get(controlName)?.dirty)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  registerAddKitchenSubmit(){
   let AddKitchenData={
    username:this.AddKitchen.value.username as string,
    password:this.AddKitchen.value.password as string
   }
   console.log(AddKitchenData);

   this.RestaurantService.postAddKitchen(AddKitchenData, this.data.idRest).subscribe({
    next:(data)=>{
      console.log(data);
      this.toastr.success('تم إضافة حساب المطبخ بنجاح',data.msg)
      this.AddKitchen.reset()
      this.dialogRef.close();
    },error:(err)=>{
      console.log(err);
      this.toastr.error("هناك خطاء في اضافة حساب المطبخ", err.msg)
    }
   })
  }

}
