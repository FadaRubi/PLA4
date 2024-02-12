import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline, pencilOutline } from 'ionicons/icons';
import { IVacanca } from 'src/app/model/vacanca';
import { I18nService } from 'src/app/shared/services/i18n.service';
import { VacancesService } from 'src/app/shared/services/vacances.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonIcon, CommonModule, IonFab, IonFabButton, TranslateModule,
    IonItem, IonSelect, IonSelectOption],
})
export class Tab1Page implements OnInit {

    currentLang = '';

    constructor(private authService: AuthService,
      private router: Router,
      private vacancesService: VacancesService,
      private i18nService: I18nService,
      private translateService: TranslateService
      ) {
        addIcons({
          addOutline,
          pencilOutline
        });
    }

    vacances: IVacanca[] = [];
    vacancaSelected: IVacanca = {} as IVacanca;  
    helloworld = '';

    ngOnInit(): void {
      this.currentLang = this.i18nService.getCurrentLanguage();
      console.log('this.currentLang', this.currentLang);
    }

    ionViewWillEnter(): any {
      console.log('ionViewWillEnter');
      this.helloworld = this.translateService.instant("HELLOWORLD");
      this.vacancesService.getVacancesByUser().subscribe((vacances: IVacanca[]) => {
        this.vacances = vacances;
      });
  }

    ionViewDidLoad(): any {
      console.log('ionViewDidLoad');
    }

    ionViewDidEnter(): any {
      console.log('ionViewDidEnter');
    }

    ionViewWillLeave(): any {
      console.log('ionViewWillLeave');
    }

    ionViewDidLeave(): any {
      console.log('ionViewDidLeave');
    }

    ionViewWillUnload(): any {
      console.log('ionViewWillUnload');
    }

    logout() {
      this.authService.logout().then(() => {
        this.router.navigate(['/login'], {replaceUrl: true});
      })
    }

    logVacanca(vacanca: IVacanca) {
      console.log(vacanca);
    }
    
    addVacanca() {
      this.router.navigate(['/vacanca-form']);
    }

    updateVacanca(vacanca: IVacanca) {
      this.router.navigate([`/vacanca-form/${vacanca.id}`]);
    }

    changeLanguage(event: CustomEvent) {
      console.log("event", event.detail.value);
      this.i18nService.changeLanguage(event.detail.value);
    }

}
