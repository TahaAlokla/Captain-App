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
 postSubscribedUser(post:any):Observable<any>{
   return  this.HttpClient.post(this.postApiSubscribedUser,post)
 }
}
