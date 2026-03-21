import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const joinGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (auth.isLoggedIn()) return true;

  const token = route.paramMap.get('token');
  toast.show('Faça login ou crie uma conta para entrar no grupo via link de convite.', 'info', 6000);
  return router.createUrlTree(['/auth/login'], {
    queryParams: { redirect: `/join/${token}` },
  });
};
