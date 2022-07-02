import { RegistrationUsersService } from './../shared/services/registration-users.service';
import { TokenStorageService } from './../shared/services/token-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadAdminDashboardGuard implements CanLoad {
  constructor(private TokenStorageService:TokenStorageService, private RegistrationUsersService:RegistrationUsersService , private router:Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.TokenStorageService.getToken!==null){
      return this.RegistrationUsersService.isAdmin$.pipe(map((isAdmin:boolean)=>{
        if(isAdmin){
          return true
        }
        this.router.navigate(['/login'])
        return false
      }))






    }
    else{
      return  false
    }
  }


}
