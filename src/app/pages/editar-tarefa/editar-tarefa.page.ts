import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { GoogleTasksService } from '../../services/google-tasks';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.page.html',
  styleUrls: ['./editar-tarefa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonButtons, IonBackButton]
})
export class EditarTarefaPage {

  tarefaId = '';
  titulo = '';
  data = '';
  hora = '';
  descricao = '';
  categoria = '';
  prioridade = '';

  constructor(private googleTasks: GoogleTasksService, private router: Router) {}

  ionViewWillEnter() {
  const tarefa = history.state?.tarefa;
  if (tarefa) {
    this.tarefaId = tarefa.id;
    this.titulo = tarefa.titulo;
    this.descricao = tarefa.descricao;
    if (tarefa.data) {
      const partes = tarefa.data.split('/');
      if (partes.length === 3) {
        this.data = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }
    this.hora = tarefa.hora || '';
    this.categoria = tarefa.categoria || '';
    this.prioridade = tarefa.prioridade || '';
  }
}

  async salvar() {
    if (!this.titulo) {
      alert('Digite o título da tarefa!');
      return;
    }
    try {
      await this.googleTasks.editarTarefa(this.tarefaId, this.titulo, this.descricao, this.data);
      alert('Tarefa atualizada com sucesso!');
      this.router.navigate(['/tabs/home']);
    } catch (error) {
      alert('Erro ao atualizar tarefa. Tente novamente!');
    }
  }
}
