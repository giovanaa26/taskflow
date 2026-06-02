import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then(m => m.CadastroPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'nova-tarefa',
        loadComponent: () => import('./pages/nova-tarefa/nova-tarefa.page').then(m => m.NovaTarefaPage)
      },
      {
        path: 'editar-tarefa',
        loadComponent: () => import('./pages/editar-tarefa/editar-tarefa.page').then(m => m.EditarTarefaPage)
      },
      {
        path: 'sobre',
        loadComponent: () => import('./pages/sobre/sobre.page').then(m => m.SobrePage)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'trocar-senha',
    loadComponent: () => import('./pages/trocar-senha/trocar-senha.page').then( m => m.TrocarSenhaPage)
  },
];