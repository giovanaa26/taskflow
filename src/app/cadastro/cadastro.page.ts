import { RouterLink, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, IonIcon, CommonModule, FormsModule, RouterLink]
})
export class CadastroPage {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  mostrarSenha = false;
  tipoSenha = 'password';
  mostrarConfirmarSenha = false;
  tipoConfirmarSenha = 'password';

  constructor(private auth: AuthService, private router: Router) {
    addIcons({ eyeOutline, eyeOffOutline });
  }


  toggleSenha() {
  this.mostrarSenha = !this.mostrarSenha;
  this.tipoSenha = this.mostrarSenha ? 'text' : 'password';
  }

  toggleConfirmarSenha() {
    this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;
    this.tipoConfirmarSenha = this.mostrarConfirmarSenha ? 'text' : 'password';
  }

  async cadastrar() {
  if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
    alert('Preencha todos os campos!');
    return;
  }
  if (this.senha !== this.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }
  try {
    await this.auth.cadastrar(this.email, this.senha, this.nome);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  } catch (error) {
    alert('Erro ao cadastrar. Verifique os dados!');
  }
}
}
