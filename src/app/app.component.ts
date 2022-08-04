import { RegistrationUsersService } from './shared/services/registration-users.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'captain-front-app';
  hidingNavbarVisitHomeRest= false;
  constructor(public translate:TranslateService, private title:Title , private RegistrationUsersService:RegistrationUsersService ,private cdr: ChangeDetectorRef){
    this.title.setTitle("كابتن | Smart Resturant")

  }
  ngAfterViewInit() {
    this.RegistrationUsersService.VisitRestHome.subscribe(val=>{
      this.hidingNavbarVisitHomeRest= val
    })
    this.cdr.detectChanges();
  }
  ngOnInit(): void {


  }
}
