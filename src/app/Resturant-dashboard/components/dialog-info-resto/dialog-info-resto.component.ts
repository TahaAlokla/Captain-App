import { map } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) { }

  loadRestInfo() {
    this.EditRestaurant.patchValue({
      address: this.restaurantInfoData.address,
      workingStart: this.restaurantInfoData.workingStart,
      workingEnd: this.restaurantInfoData.workingEnd,
      phone_contact: this.restaurantInfoData.phone_contact.map((obj, index) => {
        this.addPhone_contact(obj.name, obj.number, index)
        console.log("map index ", index);
      }),
      web_links: this.restaurantInfoData.web_links.map((obj, index) => {
        this.addWeb_links(obj.name, obj.link, index)
      }),

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
        name: ['', [Validators.required,]],
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
        name: ['',[ Validators.required,]],
        link: ['',[ Validators.required,]],
      }),
    ]),
  });

  get phone_contact() {
    return this.EditRestaurant.get('phone_contact') as FormArray;
  }
  get web_links() {
    return this.EditRestaurant.get('web_links') as FormArray;
  }
  addWeb_links(name?: string, link?: string, index?: number) {
    if (name && link && index === 0) {
      this.web_links.setValue([{ name: name, link: link }])
      // this.addWeb_links.
    } else if (name && link && index !== 0) {
      // this.web_links
      this.web_links.push(
        this.fb.group({
          name: [name],
          link: [link],
        })
      );
    } else {
      this.web_links.push(
        this.fb.group({
          name: [''],
          link: [''],
        })
      );
    }

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

  addPhone_contact(name?: string, number?: string, index?: number) {
    console.log('add group ');
    if (name && number && index === 0) {
      this.phone_contact.patchValue([{ name: name, number: number }])
    } else if (name && number && index !== 0) {
      this.phone_contact.push(
        this.fb.group({
          name: [name],
          number: [
            number,
            [
              Validators.required,
              Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/),
            ],
          ],
        })
      );
    }
    else {
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
    }

    console.log(this.phone_contact.length);
  }

  getError(controlName: string) {
    return (
      this.EditRestaurant.get(controlName)?.invalid &&
      (this.EditRestaurant.get(controlName)?.touched ||
        this.EditRestaurant.get(controlName)?.dirty)
    );
  }
  getErrorNestingControlPhone_contact(controlName: string, i: number) {
    let group = this.phone_contact.at(i) as FormGroup
    return (
      group.get(controlName)?.invalid && (group.get(controlName)?.touched ||
        group.get(controlName)?.dirty)
    )
  }
  getErrorNestingControlWeb_links(controlName: string, i: number) {
    let group = this.web_links.at(i) as FormGroup
    return (
      group.get(controlName)?.invalid && (group.get(controlName)?.touched ||
        group.get(controlName)?.dirty)
    )
  }

  EditSubmitRestaurant() {
    let RestaurantData = new FormData();
    RestaurantData.append('id', this.data.id);
    RestaurantData.append('address', this.EditRestaurant.value.address);
    RestaurantData.append(
      'workingStart',
      this.EditRestaurant.value.workingStart
    );
    RestaurantData.append('workingEnd', this.EditRestaurant.value.workingEnd);

    RestaurantData.append('image', this.EditRestaurant.value.image);
    for (let i = 0; i < this.EditRestaurant.value.web_links.length; i++) {
      console.log(this.EditRestaurant.value.web_links[i]?.link);
      RestaurantData.append(
        `web_links[${i}][name]`,
        this.EditRestaurant.value.web_links[i]?.name
      );
      RestaurantData.append(
        `web_links[${i}][link]`,
        this.EditRestaurant.value.web_links[i]?.link
      );
    }
    for (let i = 0; i < this.EditRestaurant.value.phone_contact.length; i++) {
      console.log(this.EditRestaurant.value.phone_contact[i]?.name);
      console.log(this.EditRestaurant.value.phone_contact[i]?.number);
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
      next: (data) => {
        console.log(data);
        this.toastr.success("تم التعدل بنجاح")
        this.dialogRef.close();
      }, error: (err) => {
        console.log(err);
        this.toastr.error("هناك خطاء ما ")
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
