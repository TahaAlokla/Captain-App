import { RestaurantHomePageService } from './../../../shared/services/restaurant-home-page.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ReservationsRestaurant } from 'src/app/shared/interfaces/Reservations-Restaurant.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-resturant',
  templateUrl: './home-resturant.component.html',
  styleUrls: ['./home-resturant.component.scss']
})
export class HomeResturantComponent implements OnInit {
  rest_id:string=''

  minDate = new Date(new Date().setDate(new Date().getDate()));
  // max date after 4 month
  maxDate = new Date(new Date().setDate(new Date().getDate() + 120))
  constructor(private fb: FormBuilder, private RestaurantHomePageService: RestaurantHomePageService, private activeRouter: ActivatedRoute) { }

  registerReservation = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/)]],
    numberTable: ['', [Validators.required, RxwebValidators.numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })]],
    dateOfReservation: ['', [Validators.required]],
    note: ['', []],
  })
  // TODO : 6/7/2022
  // "rest_id": "62bcecc3aa5f2d5599b2532d",
  // "checkSpam": "5"

  getError(controlName: string) {
    return this.registerReservation.get(controlName)?.invalid && (this.registerReservation.get(controlName)?.touched || this.registerReservation.get(controlName)?.dirty)
  }
  get numberTable() {
    return this.registerReservation.get('numberTable');
  }
  get phone() {
    return this.registerReservation.get('phone');
  }
  ngOnInit(): void {
    // const id = uuidv4();
    //  TODO when refresh browser change value | so be should save that local storage and check if existing dot need return value restaurant
    // todo : i think generation uuid when using postSend data not ngonit
    // console.log(" uuid.get()", id);
    this.activeRouter.paramMap.subscribe(param => {
      this.rest_id = param.get('id');
      // console.log("this.rest_id", this.rest_id);
       });
  }
  registerReservationSubmit() {
    let checkSpam: string = ''
    if (this.RestaurantHomePageService.getUUID()) {
      console.log("this.RestaurantHomePageService.getUUID()", this.RestaurantHomePageService.getUUID());
      checkSpam = this.RestaurantHomePageService.getUUID()
      console.log("checkSpam", checkSpam);
    } else {
      const id = uuidv4();
      this.RestaurantHomePageService.saveUUID(id)
      checkSpam = id
      console.log(" else checkSpam", checkSpam);
    }
    let registerReservationData: ReservationsRestaurant = {
      name: this.registerReservation.value.name,
      phone: this.registerReservation.value.phone as string,
      numberTable: +this.registerReservation.value.numberTable,
      dateOfReservation: this.registerReservation.value.dateOfReservation,
      note: this.registerReservation.value.note,
      checkSpam: checkSpam,
      rest_id: this.rest_id
    }
    // console.log(registerReservationData);

    this.RestaurantHomePageService.postReservations_restaurants(registerReservationData,this.rest_id ).subscribe({
      next: (data) => {
        // console.log(data);
        this.registerReservation.reset()
        Swal.fire(
         {
          title:'تم تثبيت الحجز',
          icon: 'success',
          showCloseButton: false,
          showConfirmButton: true,
          showCancelButton:false,
          focusConfirm: true,
          confirmButtonText:'إغلاق',
          timer: 4500,
          confirmButtonColor:'#d33'
         }
        )
      }, error: (err) => {
        // console.log(err);
        this.registerReservation.reset()
        Swal.fire(
          {
           title:'هناك حجز مسبق قمت به',
           icon: 'error',
           showCloseButton: false,
          showConfirmButton: true,
          showCancelButton:false,
          focusConfirm: true,
          confirmButtonText:'إغلاق',
          timer: 4500,
          confirmButtonColor:'#d33'
          }
         )

      }
    })

  }


}
