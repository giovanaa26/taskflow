import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonItem,IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';
import { GoogleAuthService } from '../services/google-auth';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, IonItem, IonIcon, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {

  email = '';
  senha = '';
  mostrarSenha = false;
  tipoSenha = 'password';

  constructor(
    private auth: AuthService,
    private googleAuth: GoogleAuthService,
    private router: Router
  ) {
     addIcons({ eyeOutline, eyeOffOutline });
  }

  toggleSenha() {
  this.mostrarSenha = !this.mostrarSenha;
  this.tipoSenha = this.mostrarSenha ? 'text' : 'password';
  }

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