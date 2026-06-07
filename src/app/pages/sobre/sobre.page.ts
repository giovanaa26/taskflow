import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkboxOutline,
  documentTextOutline,
  peopleOutline,
  logoInstagram,
  logoLinkedin,
  logoGithub,
  mailOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonToolbar, IonHeader, CommonModule]
})
export class SobrePage implements OnInit {

  nomeUsuario = '';

  constructor(private auth: AuthService, private router: Router) {
    addIcons({
      checkboxOutline,
      documentTextOutline,
      peopleOutline,
      logoInstagram,
      logoLinkedin,
      logoGithub,
      mailOutline
    });
  }

  ngOnInit() {
    this.auth.getUsuario().subscribe(usuario => {
      if (usuario) {
        usuario.reload().then(() => {
          this.nomeUsuario = usuario.displayName || usuario.email || 'Usuário';
        });
      }
    });
  }

  async sair() {
  await this.auth.logout();
  sessionStorage.clear();
  this.router.navigate(['/home']);
}
}