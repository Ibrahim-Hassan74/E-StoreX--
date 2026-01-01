import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const token = accountService.getToken();

  // Helper to add token to request
  const addToken = (request: any, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  let authReq = req;
  if (token) {
    authReq = addToken(req, token);
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // If we are already refreshing, wait for it
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              return next(addToken(req, token!));
            })
          );
        } else {
          isRefreshing = true;
          refreshTokenSubject.next(null);
          
          const refreshToken = accountService.getRefreshToken();
          const currentToken = accountService.getToken(); // Need current expired token? API usually just needs refresh token & expired token

          if (refreshToken && currentToken) {
            return accountService.refreshToken({ token: currentToken, refreshToken }).pipe(
              switchMap((response) => {
                isRefreshing = false;
                if (response.success && response.token) {
                  refreshTokenSubject.next(response.token);
                  return next(addToken(req, response.token));
                } else {
                  accountService.logout();
                  return throwError(() => error);
                }
              }),
              catchError((refreshErr) => {
                isRefreshing = false;
                accountService.logout();
                return throwError(() => refreshErr);
              })
            );
          } else {
            // No refresh token available
            accountService.logout();
            return throwError(() => error);
          }
        }
      }
      return throwError(() => error);
    })
  );
};
