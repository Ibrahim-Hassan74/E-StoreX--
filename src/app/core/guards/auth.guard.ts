import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isAuthenticated()) {
    return true;
  }

  // Redirect to login page with return url
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
