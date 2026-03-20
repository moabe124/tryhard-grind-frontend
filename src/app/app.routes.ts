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
    path: 'groups',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/groups/groups.routes').then((m) => m.groupsRoutes),
  },
  { path: '**', redirectTo: 'auth/login' },
];
