import { Routes } from '@angular/router';

export const groupsRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./group-detail/group-detail').then((m) => m.GroupDetailComponent),
  },
];
