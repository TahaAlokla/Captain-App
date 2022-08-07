import { Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  EditCategory: Subscription
  postCreateCategory: Subscription
  constructor(private fb: FormBuilder,
    private RestaurantService: RestaurantDashboardService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { status: string, categoryObj: any }) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this.EditCategory) {
      this.EditCategory.unsubscribe()
    }
    if (this.postCreateCategory) {
      this.postCreateCategory.unsubscribe()
    }
  }
  AddCategory = this.fb.group({
    name: [this.data.categoryObj?.name, [Validators.required]]
  })

  getError(controlName: string) {
    // 
    return this.AddCategory.get(controlName)?.invalid && (this.AddCategory.get(controlName)?.touched || this.AddCategory.get(controlName)?.dirty)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  CategorySubmit() {
    if (this.data.status === 'addCategory') {
      let name = this.AddCategory.value.name as string
      this.postCreateCategory = this.RestaurantService.postCreateCategory(name).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("إضافة الصنف بنجاح", data.msg)
          this.dialogRef.close();
        }, error: (err) => {
          console.log(err);
          this.toastr.error("هناك خطاء في اضافة الصنف", err.error.msg)

        }
      })
    } else {
      let name = this.AddCategory.value.name as string
      let id = this.data.categoryObj?._id as string
      console.log("id category", id);

      this.EditCategory = this.RestaurantService.EditCategory(name, id).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("تعديل الصنف بنجاح", data.msg)
          this.dialogRef.close();
        }, error: (err) => {
          console.log(err);
          this.toastr.error("هناك خطاء في تعديل الصنف", err.error.msg)

        }
      })

    }

  }
}
