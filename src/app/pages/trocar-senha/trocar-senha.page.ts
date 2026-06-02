import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { sendPasswordResetEmail, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class TrocarSenhaPage {

  email = '';

  constructor(private auth: Auth) {}

  async trocarSenha() {
    if (!this.email) {
      alert('Digite seu email!');
      return;
    }
    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.email = '';
      alert('Se este email estiver cadastrado, você receberá as instruções de redefinição em breve.');
    } catch (error) {
      alert('Email não encontrado. Verifique e tente novamente.');
    }
  }
}