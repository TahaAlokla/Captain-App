import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const { baseUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class HomePageProviderService {

  constructor(private HttpClient:HttpClient) { }

 private readonly postApiSubscribedUser:string='/add-subscripe'
//  /api/restaurants/getAll
private readonly getPublicRestaurantsUrl:string=`${baseUrl}/api/restaurants/getAll`



 private get postApiSubscribedUserUrl(){
   return `${baseUrl}${this.postApiSubscribedUser}`
 }
 getPublicRestaurants():Observable<any>{
   return this.HttpClient.get(this.getPublicRestaurantsUrl)
 }
 postSubscribedUser(post:any):Observable<any>{
   return  this.HttpClient.post(this.postApiSubscribedUserUrl,post)
 }
}
