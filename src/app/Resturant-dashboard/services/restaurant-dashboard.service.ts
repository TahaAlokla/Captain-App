import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;

@Injectable()
export class RestaurantDashboardService {
private readonly restaurantsDetail=`${baseUrl}/api/restaurants/detail`
private readonly restaurantsEdit=`${baseUrl}/api/restaurants/edit`
  constructor(private http:HttpClient) {
   }

   postRestaurantsEdit(formData:any):Observable<any>{
    return this.http.post(this.restaurantsEdit,formData)
   }

   postRestaurantsDetail(id:string):Observable<any>{
    return this.http.post(this.restaurantsDetail,{id:id})
   }


}
