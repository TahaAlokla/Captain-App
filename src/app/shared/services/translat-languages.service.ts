import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatLanguagesService {

  currentLang: string = ''
  constructor(private translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang')||'ar'
  }
  changeCurrentLang(lang: string) {
    this.translate.use(lang)
    localStorage.setItem('currentLang',lang)
    this.translate.use(this.currentLang)
  }
}
