import { AdminDashboardService } from './../../services/admin-dashboard.service';
import { AddRestaurant } from './../../interfaces/add-restaurant';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
  styleUrls: ['./add-resturant.component.scss']
})
export class AddResturantComponent implements OnInit {
  hide: boolean = true
  // return date for  day
  minDate = new Date(new Date().setDate(new Date().getDate()));
  maxDate = new Date(new Date().setDate(new Date().getDate() + 365))
  constructor(private fb: FormBuilder, private AdminService: AdminDashboardService, private toastr: ToastrService) { }
  registerRestaurant = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/)]],
    address: ['', Validators.required],
    password: ['', Validators.required],
    expiration_date: ['', [Validators.required]]


  })

  ngOnInit(): void {
  }
  get email() {
    return this.registerRestaurant.get('email');
  }
  get phone() {
    return this.registerRestaurant.get('phone');
  }
  getError(controlName: string) {
    return this.registerRestaurant.get(controlName)?.invalid && (this.registerRestaurant.get(controlName)?.touched || this.registerRestaurant.get(controlName)?.dirty)
  }

  registerSubmitRestaurant() {
    if (this.registerRestaurant.invalid) {
      return
    }
    else {
      let Restaurant: AddRestaurant = {
        name: this.registerRestaurant.value.name as string,
        username: this.registerRestaurant.value.username as string,
        password: this.registerRestaurant.value.password as string,
        confirmationPassword: this.registerRestaurant.value.password as string,
        address: this.registerRestaurant.value.address as string,
        email: this.registerRestaurant.value.email as string,
        phone: this.registerRestaurant.value.phone as string,
        expiration_date:this.registerRestaurant.value.expiration_date as string
      }
      console.log(Restaurant);

      this.AdminService.PostRegisterRestaurant(Restaurant).subscribe({
        next: (data) => {
          this.registerRestaurant.reset()
          this.toastr.success("", "تم تسجيل المطعم بنجاح", {
            timeOut: 3000,
          })
          console.log(data);
        }, error: (err) => {
          console.log(err);
          this.toastr.error(err.error.msg, "هناك خطاء ما في التسجل", {
            timeOut: 3000,
          })
          console.log(err);
        }
      })
    }
  }
}
