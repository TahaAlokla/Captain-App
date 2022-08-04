import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NumericValueType,
  ReactiveFormConfig,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-table-input-add',
  templateUrl: './table-input-add.component.html',
  styleUrls: ['./table-input-add.component.scss'],
})
export class TableInputAddComponent implements OnInit {
  constructor(private RestaurantService: RestaurantDashboardService,private fb: FormBuilder,private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { tablesNumber:string  }) {}
  addTableNumber = this.fb.group({
    tableNumber: [
      this.data.tablesNumber,
      [
        Validators.required,
        RxwebValidators.numeric({
          acceptValue: NumericValueType.Both,
          allowDecimal: false,
        }),
      ],
    ],
  });
  getError(controlName: string) {
    // this.addTableNumber.get(controlName)?.touched ||
    return (
      this.addTableNumber.get(controlName)?.invalid &&
      this.addTableNumber.get(controlName)?.dirty
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit(){
    let number = this.addTableNumber.value.tableNumber as string
    console.log(number);

    this.RestaurantService.creteNewTable(number).subscribe({
      next:(data)=>{
        console.log(data);
        this.toastr.success("تم إضافة الطلب بنجاح",data.msg)
        this.addTableNumber.reset()
      },error:(err)=>{
        console.log(err);
        this.toastr.error("هناك مشكلة في الطلب ",err.error)
      },complete:()=>{
        this.dialogRef.close();
      }
    })


  }
  ngOnInit(): void {
    ReactiveFormConfig.set({
      "validationMessage": {
          "numeric": "أدخل اعداد صحيحة وموجبة",

      }
  });
  }
}
