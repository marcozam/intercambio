import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!req.headers.get('Authorization')) {
      return next.handle(req);
    };

    const token = this.loginService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
          return throwError(() => err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}