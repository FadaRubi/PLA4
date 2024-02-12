import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'vacanca-form',
    loadComponent: () => import('./pages/vacanca-form/vacanca-form.page').then( m => m.VacancaFormPage)
  },
  {
    path: 'vacanca-form/:id',
    loadComponent: () => import('./pages/vacanca-form/vacanca-form.page').then( m => m.VacancaFormPage)
  },
];
