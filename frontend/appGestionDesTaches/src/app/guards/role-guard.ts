import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) { router.navigate(['/login']); return false; }
  if (auth.isAdmin()) return true;
  router.navigate(['/unauthorized']); return false;
};

export const chefGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) { router.navigate(['/login']); return false; }
  if (auth.isChefDeProjet()) return true;
  router.navigate(['/login']); return false;
};

export const devGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) { router.navigate(['/login']); return false; }
  if (auth.isDev()) return true;
  
  router.navigate(['/login']); return false;
};