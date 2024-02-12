import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab2Page {

  constructor() {}

  ionViewWillEnter() {
    this.loadMap();
  }
  
  async loadMap() {
    const apiKey = 'AIzaSyC4EY9OajNCs3CZVIGIUZzw2SEJ7S3M6VQ';

const mapRef = document.getElementById('map')!;

const newMap = await GoogleMap.create({
  id: 'my-map', // Unique identifier for this map instance
  element: mapRef, // reference to the capacitor-google-map element
  apiKey: apiKey, // Your Google Maps API Key
  config: {
    center: {
      // The initial position to be rendered by the map
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // The initial zoom level to be rendered by the map
  },
});
  }

}
