import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleTasksService {

  private baseUrl = 'https://tasks.googleapis.com/tasks/v1';

  setAccessToken(token: string) {
    sessionStorage.setItem('googleAccessToken', token);
  }

  getAccessToken() {
    return sessionStorage.getItem('googleAccessToken') || '';
  }

  salvarExtras(taskId: string, hora: string, categoria: string, prioridade: string) {
    const extras = { hora, categoria, prioridade };
    localStorage.setItem(`task_extras_${taskId}`, JSON.stringify(extras));
  }

  getExtras(taskId: string) {
    const dados = localStorage.getItem(`task_extras_${taskId}`);
    return dados ? JSON.parse(dados) : { hora: '', categoria: '', prioridade: '' };
  }

  deletarExtras(taskId: string) {
    localStorage.removeItem(`task_extras_${taskId}`);
  }

  async getTarefas() {
  const token = this.getAccessToken();
  const response = await fetch(`${this.baseUrl}/lists/@default/tasks?showCompleted=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.status === 401) {
    return null;
  }
  const data = await response.json();
  return data.items || [];
}

  async criarTarefa(titulo: string, descricao?: string, data?: string) {
    const token = this.getAccessToken();
    const body: any = { title: titulo };
    if (descricao) body.notes = descricao;
    if (data) {
    const [ano, mes, dia] = data.split('-');
    body.due = new Date(Number(ano), Number(mes) - 1, Number(dia), 12, 0, 0).toISOString();
    }

    const response = await fetch(`${this.baseUrl}/lists/@default/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async concluirTarefa(taskId: string) {
    const token = this.getAccessToken();
    const response = await fetch(`${this.baseUrl}/lists/@default/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'completed' })
    });
    return response.json();
  }

  async deletarTarefa(taskId: string) {
    const token = this.getAccessToken();
    await fetch(`${this.baseUrl}/lists/@default/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async editarTarefa(taskId: string, titulo: string, descricao?: string, data?: string, hora?: string, categoria?: string, prioridade?: string) {
    const token = this.getAccessToken();
    const body: any = { title: titulo };
    if (descricao) body.notes = descricao;
    if (data) {
    const [ano, mes, dia] = data.split('-');
    body.due = new Date(Number(ano), Number(mes) - 1, Number(dia), 12, 0, 0).toISOString();
    }

    const response = await fetch(`${this.baseUrl}/lists/@default/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const resultado = await response.json();
    if (hora !== undefined && categoria !== undefined && prioridade !== undefined) {
      this.salvarExtras(taskId, hora, categoria, prioridade);
    }
    return resultado;
  }
}