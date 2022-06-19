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
  constructor(public translate:TranslateService, private title:Title){
    this.title.setTitle("كابتن | Smart Resturant")

  }
}
