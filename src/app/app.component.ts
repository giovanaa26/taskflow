import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';
import { GoogleTasksService } from './services/google-tasks';
import { GoogleAuthService } from './services/google-auth';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private googleTasks: GoogleTasksService, private googleAuth: GoogleAuthService) {
    App.addListener('appUrlOpen', (data) => {
      const url = data.url;
      if (url.includes('access_token')) {
        Browser.close();
        const hash = url.split('#')[1];
        const token = new URLSearchParams(hash).get('access_token') || '';
        if (token) {
          this.googleTasks.setAccessToken(token);
          this.googleAuth.resolverToken(token);
        }
      }
    });
  }
}