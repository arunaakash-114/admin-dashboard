import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { Support } from './pages/support/support';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: 'support',
    component: Support
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];