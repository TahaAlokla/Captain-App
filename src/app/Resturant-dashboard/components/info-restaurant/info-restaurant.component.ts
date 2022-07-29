import { FormBuilder, Validators } from '@angular/forms';
import { RestaurantDashboardService } from './../../services/restaurant-dashboard.service';
import { TokenStorageService } from './../../../shared/services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-restaurant',
  templateUrl: './info-restaurant.component.html',
  styleUrls: ['./info-restaurant.component.scss']
})
export class InfoRestaurantComponent implements OnInit {
restaurantInfoData:any
  constructor(private TokenStorageService:TokenStorageService , private RestaurantService:RestaurantDashboardService , private fb:FormBuilder) { }

  EditRestaurant = this.fb.group({
    address: ['', Validators.required],
    workingStart:[''],
    workingEnd:[''],
    phone_contact:[''],
    image:[],
    web_links:[]
    // phone: ['', [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/)]],
  })

  EditSubmitRestaurant(){

  }

  getError(controlName: string) {
    return this.EditRestaurant.get(controlName)?.invalid && (this.EditRestaurant.get(controlName)?.touched || this.EditRestaurant.get(controlName)?.dirty)
  }

  ngOnInit(): void {
   this.restaurantInfoData=  this.TokenStorageService.getUser()
   console.log(this.restaurantInfoData);
   this.TokenStorageService.saveIdRest(this.restaurantInfoData._id)
   this.RestaurantService.postRestaurantsDetail(this.restaurantInfoData._id).subscribe({
    next:(data)=>{
       this.restaurantInfoData=data.restaurant;
      //  console.log(this.restaurantInfoData.address);
       this.EditRestaurant.patchValue({
        address:this.restaurantInfoData.address
       })
       console.log(this.restaurantInfoData);
    },error:(err)=>{
     console.log(err);

    }
   })

  }

}
