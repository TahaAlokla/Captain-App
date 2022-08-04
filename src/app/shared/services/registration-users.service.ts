import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { baseUrl } = environment;
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationUsersService {
  public isAdmin$ = new BehaviorSubject(false)
  // public isAdmin$ = new ReplaySubject(1)
  public isRestaurantAdmin$ =new BehaviorSubject(false)
  public VisitRestHome =new BehaviorSubject(false)
  public isLogin$ =new BehaviorSubject(false)
  /* 31/7/2022 -9 pm
  Taha Alokla
  */

  private readonly loginAdmin:string='/api/admins/login'
  private readonly loginRestaurant:string=`${baseUrl}/api/restaurants/login`
  constructor(private HttpClient:HttpClient) { }
  private get loginAdminUrl(){
    return `${baseUrl}${this.loginAdmin}`
  }
  PostLoginAdmin(username:string, password:string):Observable<any>{
    return this.HttpClient.post(this.loginAdminUrl,{username:username, password:password})

  }

  PostLoginRestaurant(username:string, password:string):Observable<any>{
    return this.HttpClient.post(this.loginRestaurant,{username:username, password:password})
  }

}
