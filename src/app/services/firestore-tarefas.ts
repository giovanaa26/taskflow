import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTarefasService {

  constructor(private firestore: Firestore) {}

  async criarTarefa(userId: string, tarefa: any) {
    const col = collection(this.firestore, 'tarefas');
    return addDoc(col, { ...tarefa, userId, concluida: false });
  }

  async getTarefas(userId: string) {
    const col = collection(this.firestore, 'tarefas');
    const q = query(col, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async editarTarefa(taskId: string, tarefa: any) {
    const docRef = doc(this.firestore, 'tarefas', taskId);
    return updateDoc(docRef, tarefa);
  }

  async deletarTarefa(taskId: string) {
    const docRef = doc(this.firestore, 'tarefas', taskId);
    return deleteDoc(docRef);
  }

  async concluirTarefa(taskId: string) {
    const docRef = doc(this.firestore, 'tarefas', taskId);
    return updateDoc(docRef, { concluida: true });
  }
}