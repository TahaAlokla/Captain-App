import { AddRestaurant } from './../interfaces/add-restaurant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;
@Injectable()
export class AdminDashboardService {

  private readonly registerRestaurant: string = `${baseUrl}/api/restaurants/create`
  private readonly subscribeRestaurant: string = `${baseUrl}/api/admins/subscriptions/list`
  private readonly restaurantDeactivateUrl: string = `${baseUrl}/api/restaurants/delete`
  // /api/restaurants/active
  private readonly restaurantActivateUrl: string = `${baseUrl}/api/restaurants/active`
  // /api/restaurants/list
  private readonly restaurantListUrl: string = `${baseUrl}/api/restaurants/list`
  // /api/admins/subscriptions/accept
  private readonly acceptRestaurantUrl:string =`${baseUrl}/api/admins/subscriptions/accept`
  constructor(private http: HttpClient) { }
  PostRegisterRestaurant(restaurantData: AddRestaurant): Observable<any> {
    return this.http.post(this.registerRestaurant, restaurantData)
  }
  restaurantDeactivate(id: string): Observable<any> {
    console.log(id);
    return this.http.put(this.restaurantDeactivateUrl, { id: id })
  }
  restaurantActivate(id: string, expiration_date: string): Observable<any> {
    return this.http.put(this.restaurantActivateUrl, { id: id, expiration_date: expiration_date })
  }
  getRestaurantList(): Observable<any> {
    return this.http.get(this.restaurantListUrl)
  }
  postAcceptRestaurant(dataSubscribe:any):Observable<any>{
    /*
    30/6/2022
    Taha Alokla
    كتبت هذا وعقلي مناصفة بين هنا وبين مكان أخر مستحيل الوصول
    * الله يغربل حياة جوها فاضي *
    */
    return this.http.post(this.acceptRestaurantUrl,dataSubscribe)
  }




  getSubscribedRestaurant(): Observable<any> {
    return this.http.get(this.subscribeRestaurant)
  }
}
