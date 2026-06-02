import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, CommonModule, FormsModule, RouterLink]
})
export class CadastroPage {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(private auth: AuthService, private router: Router) {}

  async cadastrar() {
  if (this.senha !== this.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }
  try {
    await this.auth.cadastrar(this.email, this.senha, this.nome);
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.router.navigate(['/tabs/home']);
  } catch (error) {
    alert('Erro ao cadastrar. Verifique os dados!');
  }
}
}
