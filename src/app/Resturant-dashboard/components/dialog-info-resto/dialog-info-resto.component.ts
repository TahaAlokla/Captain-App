import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDashboardService } from '../../services/restaurant-dashboard.service';

@Component({
  selector: 'app-dialog-info-resto',
  templateUrl: './dialog-info-resto.component.html',
  styleUrls: ['./dialog-info-resto.component.scss'],
})
export class DialogInfoRestoComponent implements OnInit {
  restaurantInfoData: any;
  imagePreview: string;
  constructor(
    private RestaurantService: RestaurantDashboardService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  loadRestInfo() {
    this.EditRestaurant.patchValue({
      address: this.restaurantInfoData.address,
      workingStart: this.restaurantInfoData.workingStart,
      workingEnd: this.restaurantInfoData.workingEnd,
    });
  }

  ngOnInit(): void {
    this.RestaurantService.postRestaurantsDetail(this.data.id).subscribe({
      next: (data) => {
        this.restaurantInfoData = data.restaurant;
        //  console.log(this.restaurantInfoData.address);
        this.loadRestInfo();
        console.log(this.restaurantInfoData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  EditRestaurant = this.fb.group({
    address: ['', Validators.required],
    workingStart: [''],
    workingEnd: [''],
    phone_contact: this.fb.array([
      this.fb.group({
        name: [''],
        number: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/),
          ],
        ],
      }),
    ]),
    image: [],
    web_links: this.fb.array([
      this.fb.group({
        name: [''],
        link: [''],
      }),
    ]),
  });

  get phone_contact() {
    return this.EditRestaurant.get('phone_contact') as FormArray;
  }
  get web_links() {
    return this.EditRestaurant.get('web_links') as FormArray;
  }
  addWeb_links() {
    this.web_links.push(
      this.fb.group({
        name: [''],
        link: [''],
      })
    );
  }

  OnImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.EditRestaurant.patchValue({ image: file });
    this.EditRestaurant.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addPhone_contact() {
    console.log('add group ');

    this.phone_contact.push(
      this.fb.group({
        name: [''],
        number: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/),
          ],
        ],
      })
    );
    console.log(this.phone_contact.length);
  }

  getError(controlName: string) {
    return (
      this.EditRestaurant.get(controlName)?.invalid &&
      (this.EditRestaurant.get(controlName)?.touched ||
        this.EditRestaurant.get(controlName)?.dirty)
    );
  }

  EditSubmitRestaurant() {
    let RestaurantData = new FormData();
    RestaurantData.append('id', this.data.id) ;
    RestaurantData.append('address', this.EditRestaurant.value.address);
    RestaurantData.append(
      'workingStart',
      this.EditRestaurant.value.workingStart
    );
    RestaurantData.append('workingEnd', this.EditRestaurant.value.workingEnd);

    RestaurantData.append('image', this.EditRestaurant.value.image);
    for (let i = 0; i < this.EditRestaurant.value.web_links.length; i++) {
      console.log(this.EditRestaurant.value.web_links[i].link);
      RestaurantData.append(
        `web_links[${i}][name]`,
        this.EditRestaurant.value.web_links[i].name
      );
      RestaurantData.append(
        `web_links[${i}][link]`,
        this.EditRestaurant.value.web_links[i].link
      );
    }
    for (let i = 0; i < this.EditRestaurant.value.phone_contact.length; i++) {
      console.log(this.EditRestaurant.value.phone_contact[i].name);
      console.log(this.EditRestaurant.value.phone_contact[i].number);
      RestaurantData.append(
        `phone_contact[${i}][name]`,
        this.EditRestaurant.value.phone_contact[i].name
      );
      RestaurantData.append(
        `phone_contact[${i}][number]`,
        this.EditRestaurant.value.phone_contact[i].number
      );
    }
    this.RestaurantService.postRestaurantsEdit(RestaurantData).subscribe({
      next:(data)=>{
        console.log(data);
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
