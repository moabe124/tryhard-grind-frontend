import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
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
        path: 'groups',
        loadChildren: () =>
          import('./features/groups/groups.routes').then((m) => m.groupsRoutes),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
