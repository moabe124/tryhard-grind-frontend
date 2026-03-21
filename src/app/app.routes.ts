import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/app-layout/app-layout').then((m) => m.AppLayoutComponent),
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.homeRoutes),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./features/groups/groups.routes').then((m) => m.groupsRoutes),
      },
    ],
  },
  {
    path: 'join/:token',
    loadChildren: () =>
      import('./features/join/join.routes').then((m) => m.joinRoutes),
  },
  { path: '**', redirectTo: 'auth/login' },
];
