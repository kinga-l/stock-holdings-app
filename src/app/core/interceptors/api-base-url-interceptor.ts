import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsolute = req.url.startsWith('http');
  if (isAbsolute) return next(req);

  const apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`,
  });
  return next(apiReq);
};
