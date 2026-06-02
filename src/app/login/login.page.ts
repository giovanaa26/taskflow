import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';
import { GoogleAuthService } from '../services/google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, IonItem, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {

  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private googleAuth: GoogleAuthService,
    private router: Router
  ) {}

  async login() {
  try {
    await this.auth.login(this.email, this.senha);
    try {
      await this.googleAuth.iniciarLogin();
      sessionStorage.setItem('usaGoogleTasks', 'true');
    } catch (error) {
      sessionStorage.setItem('usaGoogleTasks', 'false');
    }
    this.router.navigate(['/tabs/home']);
  } catch (error) {
    alert('Email ou senha incorretos!');
  }
}

async loginSemGoogle() {
  try {
    await this.auth.login(this.email, this.senha);
    sessionStorage.setItem('usaGoogleTasks', 'false');
    this.router.navigate(['/tabs/home']);
  } catch (error) {
    alert('Email ou senha incorretos!');
  }
}
}