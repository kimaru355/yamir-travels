import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRoutesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token: string = localStorage.getItem('token') || '';

  if (token) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
