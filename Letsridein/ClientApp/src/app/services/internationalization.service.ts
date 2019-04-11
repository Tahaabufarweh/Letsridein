import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class InternationalizationService {

  constructor(private translate: TranslateService) {

  }

  setLang(lang) {
    localStorage.setItem("lang" , lang)
    this.translate.use(lang);
  }

  getLanguage() {
    let langToken = localStorage.getItem("lang")
    if (!langToken) {
      localStorage.setItem("lang", 'en')
      this.translate.use('en')
    }
   
    this.translate.use(langToken)
  }

  isRtl() {
    let langToken = localStorage.getItem("lang")
    if (!langToken)
      return "ltr";

    if (langToken == 'ar') {
      return "rtl";
    }
    else {
      return "ltr";
    }
  }
}
