import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(private translateService: TranslateService) { }

  public changeLanguage(newlang: string): void {
    this.translateService.use(newlang);
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

}
