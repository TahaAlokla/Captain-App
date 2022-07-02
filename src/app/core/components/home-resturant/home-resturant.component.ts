import { RestaurantHomePageService } from './../../../shared/services/restaurant-home-page.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-home-resturant',
  templateUrl: './home-resturant.component.html',
  styleUrls: ['./home-resturant.component.scss']
})
export class HomeResturantComponent implements OnInit {


  minDate = new Date(new Date().setDate(new Date().getDate()));
  // max date after 4 month
  maxDate = new Date(new Date().setDate(new Date().getDate() + 120))
  constructor(private fb: FormBuilder, private RestaurantHomePageService: RestaurantHomePageService) { }

  registerReservation = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/)]],
    numberTable: ['', [Validators.required, RxwebValidators.numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })]],
    dateOfReservation: ['', [Validators.required]],
    note: ['', []],
  })
  // "rest_id": "62bcecc3aa5f2d5599b2532d",
  // "checkSpam": "5"

  getError(controlName: string) {
    return this.registerReservation.get(controlName)?.invalid && (this.registerReservation.get(controlName)?.touched || this.registerReservation.get(controlName)?.dirty)
  }

  ngOnInit(): void {
    const id = uuidv4();
    //  TODO when refresh browser change value | so be should save that local storage and check if existing dot need return value restaurant
    // todo : i think generation uuid when using postSend data not ngonit
    console.log(" uuid.get()", id);
  }

}
