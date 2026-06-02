import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, updateProfile } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  async cadastrar(email: string, senha: string, nome: string) {
    const resultado = await createUserWithEmailAndPassword(this.auth, email, senha);
    await updateProfile(resultado.user, { displayName: nome });
    return resultado;
  }

  login(email: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

  logout() {
    return signOut(this.auth);
  }

  getUsuario(): Observable<any> {
    return user(this.auth);
  }

  getUsuarioAtual() {
    return this.auth.currentUser;
  }
}