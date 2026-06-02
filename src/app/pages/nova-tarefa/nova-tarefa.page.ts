import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { GoogleTasksService } from '../../services/google-tasks';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.page.html',
  styleUrls: ['./nova-tarefa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton]
})
export class NovaTarefaPage {

  titulo = '';
  data = '';
  hora = '';
  descricao = '';
  categoria = '';
  prioridade = '';

  constructor(private googleTasks: GoogleTasksService, private router: Router) {}

  async salvar() {
  if (!this.titulo) {
    alert('Digite o título da tarefa!');
    return;
  }
  try {
    const tarefa = await this.googleTasks.criarTarefa(this.titulo, this.descricao, this.data);
    this.googleTasks.salvarExtras(tarefa.id, this.hora, this.categoria, this.prioridade);
    this.titulo = '';
    this.data = '';
    this.hora = '';
    this.descricao = '';
    this.categoria = '';
    this.prioridade = '';
    alert('Tarefa criada com sucesso!');
    this.router.navigate(['/tabs/home']);
  } catch (error) {
    alert('Erro ao criar tarefa. Tente novamente!');
  }
}
}