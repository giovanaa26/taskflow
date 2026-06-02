import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, peopleOutline, add, personOutline, logOutOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  constructor(private router: Router, private auth: AuthService) {
    addIcons({ homeOutline, peopleOutline, add, personOutline, logOutOutline });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/home']);
  }
}
