import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PushService } from './shared/services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private pushService: PushService) {
    this.pushService.addListeners();
    this.pushService.registerNotifications();
    this.pushService.getDeliveredNotifications();
  }
}
