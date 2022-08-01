import { TokenStorageService } from './../../../shared/services/token-storage.service';
import { Route, Router } from '@angular/router';
import { RegistrationUsersService } from './../../../shared/services/registration-users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  constructor(private RegistrationUsersService: RegistrationUsersService, private router:Router, private TokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.RegistrationUsersService.VisitRestHome.next(true)
  }
  ngOnDestroy(): void {
    this.RegistrationUsersService.VisitRestHome.next(false)
  }
  logout(){
    this.RegistrationUsersService.isLogin$.next(false)
    this.RegistrationUsersService.isRestaurantAdmin$.next(false)
    this.TokenStorageService.signOut()
    this.router.navigate(['/'])
  }

}
