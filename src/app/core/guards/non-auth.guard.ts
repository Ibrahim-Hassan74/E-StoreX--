import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account/account.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
