import { Routes } from '@angular/router';
import { joinGuard } from '../../core/guards/join.guard';

export const joinRoutes: Routes = [
  {
    path: '',
    canActivate: [joinGuard],
    loadComponent: () => import('./join').then((m) => m.JoinComponent),
  },
];
