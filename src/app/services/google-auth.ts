import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleTasksService } from './google-tasks';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private tokenResolve: ((token: string) => void) | null = null;

  constructor(private googleTasks: GoogleTasksService) {}

  resolverToken(token: string) {
    if (this.tokenResolve) {
      this.tokenResolve(token);
      this.tokenResolve = null;
    }
  }

  iniciarLogin(): Promise<string> {
    if (Capacitor.isNativePlatform()) {
      return this.loginNativo();
    }
    return this.loginWeb();
  }

  private loginWeb(): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: environment.googleClientId,
        scope: 'https://www.googleapis.com/auth/tasks',
        callback: (response: any) => {
          if (response.access_token) {
            this.googleTasks.setAccessToken(response.access_token);
            resolve(response.access_token);
          } else {
            reject('Erro ao obter token');
          }
        }
      });
      client.requestAccessToken();
    });
  }

  private async loginNativo(): Promise<string> {
    const redirectUri = 'http://localhost';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/tasks`;

    await Browser.open({ url: authUrl });

    return new Promise((resolve, reject) => {
      this.tokenResolve = resolve;
      setTimeout(() => reject('Timeout'), 120000);
    });
  }
}