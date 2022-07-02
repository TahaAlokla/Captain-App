
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReservationsRestaurant } from '../interfaces/Reservations-Restaurant.interface';
const { baseUrl } = environment;
const uuid=''
@Injectable({
  providedIn: 'root'
})
export class RestaurantHomePageService {
  // /api/restaurants/62bcecc3aa5f2d5599b2532d/reservations/create
private readonly idRestaurant:string=''
private readonly reservations_restaurants_url:string=`${baseUrl}/api/restaurants/${this.idRestaurant}/reservations/create`
  constructor(private http:HttpClient) { }

  postReservations_restaurants(data:ReservationsRestaurant):Observable<any>{
    return this.http.post(this.reservations_restaurants_url,data)
  }

  public saveUUID(uuidVal){
    window.localStorage.removeItem(uuid);
      window.localStorage.setItem(uuid, JSON.stringify(uuidVal));
  }
  public getUUID(){
    return window.localStorage.getItem(uuid);
  }
}
