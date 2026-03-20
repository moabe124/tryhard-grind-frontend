import { Routes } from '@angular/router';

export const groupsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./groups').then((m) => m.GroupsComponent),
  },
  // Fase 2 — telas a implementar conforme protótipos:
  // { path: ':id/ranking', loadComponent: () => import('./ranking/ranking').then(m => m.RankingComponent) },
  // { path: ':id/settings', loadComponent: () => import('./settings/settings').then(m => m.SettingsComponent) },
  // { path: ':id/match/new', loadComponent: () => import('./match-form/match-form').then(m => m.MatchFormComponent) },
];
