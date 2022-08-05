import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss']
})
export class AddMealComponent implements OnInit {

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private RestaurantService: RestaurantDashboardService,
    @Inject(MAT_DIALOG_DATA) public data: { mealObj: any, status: string, idTax: string }) { }

  ngOnInit(): void {
  }

  AddMeal=this.fb.group({
    name:[,[Validators.required]],
    price:[,[Validators.required, RxwebValidators.numeric({
      acceptValue: NumericValueType.PositiveNumber,
      allowDecimal: true,
    }),]],
    description:[],
    image:[,[Validators.required]],
    categories:[,[Validators.required]]
  })

}
