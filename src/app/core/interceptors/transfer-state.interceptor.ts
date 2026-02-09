import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, makeStateKey, TransferState } from '@angular/core';
import { of, tap } from 'rxjs';

export const transferStateInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const transferState = inject(TransferState);
  const stateKey = makeStateKey<any>(req.urlWithParams);

  if (transferState.hasKey(stateKey)) {
    const response = transferState.get(stateKey, null);
    transferState.remove(stateKey);
    return of(new HttpResponse({ body: response, status: 200 }));
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        transferState.set(stateKey, event.body);
      }
    })
  );
};
