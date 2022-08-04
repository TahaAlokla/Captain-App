import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NumericValueType,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss'],
})
export class AddTaxComponent implements OnInit {
  percentage: boolean = false
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private RestaurantService: RestaurantDashboardService,
    @Inject(MAT_DIALOG_DATA) public data: { taxObject: any, status: string, idTax: string }) { }

  ngOnInit(): void { }
  AddTax = this.fb.group({
    name: [this.data.taxObject?.name, [Validators.required]],
    type: [this.data.taxObject?.type, [Validators.required]],
    value: [
      this.data.taxObject?.value,
      [
        Validators.required,
        RxwebValidators.numeric({
          acceptValue: NumericValueType.PositiveNumber,
          allowDecimal: true,
        }),
      ],
    ],
  });

  getError(controlName: string) {
    return (
      this.AddTax.get(controlName)?.invalid &&
      this.AddTax.get(controlName)?.dirty
    );
  }
  taxSubmit() {
    let AddTax = {}
    if (this.AddTax.value.type === 'متغيرة') {
      AddTax = {
        name: this.AddTax.value.name,
        value: (+this.AddTax.value.value) / 100,
        type: this.AddTax.value.type
      }
    } else {
      AddTax = {
        name: this.AddTax.value.name,
        value: (+this.AddTax.value.value),
        type: this.AddTax.value.type
      }
    }
    if (this.data.status === 'addTax') {
      this.RestaurantService.createTax(AddTax).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("تم إضافة الضريبة بنجاح", data.msg)
          this.AddTax.reset()
        }, error: (err) => {
          console.log(err);
          this.toastr.error("هناك خطاء في إضافة الضريبة", err.error.msg)
        }
      })
    } else {
      this.RestaurantService.editTax(AddTax, this.data.taxObject._id).subscribe({
        next:(data)=>{
          console.log(data);
          this.toastr.success("تم تعديل الضريبة",data.msg);
          this.AddTax.reset()
          this.dialogRef.close();
        },error:(err)=>{
          console.log(err);
          this.toastr.error("هناك خطاء ما",err.error.msg)
          
        }
      })
    }


  }
  changeTax(event) {
    console.log(event.target.value);
    console.log(this.AddTax.value.type);
    if (this.AddTax.value.type === 'متغيرة') {
      this.percentage = true
    } else {
      this.percentage = false
    }


  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
