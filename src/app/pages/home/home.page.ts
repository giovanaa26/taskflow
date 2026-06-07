import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonContent, IonIcon,
  IonCheckbox, IonItem, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { checkboxOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth';
import { GoogleTasksService } from '../../services/google-tasks';
import { NativeService } from '../../services/native';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonContent, IonIcon,
    IonCheckbox, IonItem, IonSelect, IonSelectOption
  ]
})
export class HomePage implements OnInit {

  nomeUsuario = '';
  filtro = 'todas';
  tarefas: any[] = [];

  constructor(private auth: AuthService, private googleTasks: GoogleTasksService, private router: Router, private native: NativeService) {
    addIcons({ checkboxOutline, pencilOutline, trashOutline });
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

ionViewWillEnter() {
  this.carregarTarefas();
}

async carregarTarefas() {
  try {
    const itens = await this.googleTasks.getTarefas();
    if (!itens) return;
    this.tarefas = itens.map((t: any) => {
      const extras = this.googleTasks.getExtras(t.id);
      return {
        id: t.id,
        titulo: t.title || 'Sem título',
        descricao: t.notes || '',
        data: t.due ? new Date(t.due.substring(0, 10) + 'T12:00:00').toLocaleDateString('pt-BR') : '',
        hora: extras.hora,
        categoria: extras.categoria,
        prioridade: extras.prioridade,
        concluida: t.status === 'completed'
      };
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
}

  async concluirTarefa(tarefa: any) {
    if (tarefa.concluida && tarefa.id) {
      await this.googleTasks.concluirTarefa(tarefa.id);
      await this.native.vibrar();
      await this.carregarTarefas();
    }
  }

  async excluirTarefa(tarefa: any) {
  if (confirm('Deseja excluir esta tarefa?')) {
    await this.googleTasks.deletarTarefa(tarefa.id);
    this.googleTasks.deletarExtras(tarefa.id);
    await this.carregarTarefas();
  }
}

  editarTarefa(tarefa: any) {
  this.router.navigate(['/tabs/editar-tarefa'], { state: { tarefa } });
}


  get total() { return this.tarefas.length; }
  get ativas() { return this.tarefas.filter(t => !t.concluida).length; }
  get concluidas() { return this.tarefas.filter(t => t.concluida).length; }

  setFiltro(tipo: string) { this.filtro = tipo; }

  get tarefasFiltradas() {
    if (this.filtro === 'ativas') return this.tarefas.filter(t => !t.concluida);
    if (this.filtro === 'concluidas') return this.tarefas.filter(t => t.concluida);
    return this.tarefas;
  }

  async sair() {
  await this.auth.logout();
  sessionStorage.clear();
  this.router.navigate(['/home']);
}
}