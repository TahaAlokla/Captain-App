import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NumericValueType,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;
@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.scss'],
})
export class AddMealComponent implements OnInit {
  imagePreview: string;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    private RestaurantService: RestaurantDashboardService,
    @Inject(MAT_DIALOG_DATA)
    public data: { mealObj: any; status: string; }
  ) { }
  // mealObj
  listCategory!: Observable<Array<any>>;
  loadAllCategory() {
    this.listCategory = this.RestaurantService.getListCategory();
  }
  ngOnInit(): void {
    if (this.data.status === 'editMeal') {
      this.imagePreview = `${baseUrl}/${this.data.mealObj?.imageUrl}`
    }
    this.loadAllCategory();
  }
  cancelImage() {
    this.imagePreview = '';
    if (this.AddMeal.value.image) {
      this.AddMeal.patchValue({ image: null });
    }

  }
  AddMeal = this.fb.group({
    name: [this.data.mealObj?.name, [Validators.required]],
    price: [
      this.data.mealObj?.price,
      [
        Validators.required,
        RxwebValidators.numeric({
          acceptValue: NumericValueType.PositiveNumber,
          allowDecimal: true,
        }),
      ],
    ],
    description: [this.data.mealObj?.description, [Validators.required]],
    image: [],
    categories: [this.data.mealObj?.categories[0], [Validators.required]],
  });

  getError(controlName: string) {
    return (
      this.AddMeal.get(controlName)?.invalid &&
      this.AddMeal.get(controlName)?.dirty
    );
  }
  OnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.AddMeal.patchValue({ image: file });
    this.AddMeal.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  AddMealSubmit() {
    let MaleData = new FormData();
    MaleData.append('name', this.AddMeal.value.name);
    MaleData.append('price', this.AddMeal.value.price);
    MaleData.append('description', this.AddMeal.value.description);
    MaleData.append('image', this.AddMeal.value.image);
    MaleData.append('categories', this.AddMeal.value.categories);
    if (this.data.status === 'addMeal') {
      this.RestaurantService.CreateMale(MaleData).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('تم إضافة الوبجة بنجاح', data.msg);
          this.AddMeal.reset()
          this.imagePreview = ''
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('هناك خطاء', err.error.msg);
        },
      });

    } else {
      // * يارب القلوب , نسألك اللطف فيها 
      // * رحمتك يالله بالضعيف منها على الدنيا وما فيها 
      // * Taha Alokla 6/8/2022 6:30 pm 
      this.RestaurantService.editMale(MaleData, this.data.mealObj._id).subscribe({
        next: (data1:any) => {
          console.log(data1);
          this.toastr.success("تم تعديل الوجبة بنجاح",data1.msg)
          this.dialogRef.close()

        }, error: (err) => {
          console.log(err);
          this.toastr.error("هناك خطاء في تعديل الوجبة", err.error.msg)

        }
      })
    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
