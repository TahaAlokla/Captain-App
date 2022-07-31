import { RegistrationUsersService } from './shared/services/registration-users.service';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'captain-front-app';
  hidingNavbarVisitHomeRest:boolean= false
  constructor(public translate:TranslateService, private title:Title , private RegistrationUsersService:RegistrationUsersService ){
    this.title.setTitle("كابتن | Smart Resturant")

  }
  ngOnInit(): void {
    this.RegistrationUsersService.VisitRestHome.subscribe(val=>{
      this.hidingNavbarVisitHomeRest = val
    })

  }
}
