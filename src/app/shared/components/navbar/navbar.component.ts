import { Router } from '@angular/router';
import { RegistrationUsersService } from './../../services/registration-users.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: TranslateService, private RegistrationUsersService: RegistrationUsersService , private TokenStorageService:TokenStorageService , private router:Router) { }
  isAdmin: boolean = false
  isLogin: boolean = false
  isRestaurantAdmin: boolean = false
  logout(){
    this.RegistrationUsersService.isAdmin$.next(false)
    this.RegistrationUsersService.isLogin$.next(false)
    this.RegistrationUsersService.isRestaurantAdmin$.next(false)
    this.TokenStorageService.signOut()
    this.router.navigate(['/'])

  }
  ngOnInit(): void {
    this.RegistrationUsersService.isAdmin$.subscribe(val => {
      this.isAdmin = val
    })
    this.RegistrationUsersService.isLogin$.subscribe(val=>{
      this.isLogin= val
    })
    this.RegistrationUsersService.isRestaurantAdmin$.subscribe(val => {
      this.isRestaurantAdmin = val
    })
    this.RegistrationUsersService.refreshData()
  }

}
