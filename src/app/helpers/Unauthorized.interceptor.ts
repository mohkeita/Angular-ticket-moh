import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {TokenStorageService} from "../shared/token-storage.service";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.token.signOut();
          this.router.navigate(['login']);
        }

        if (!environment.production) {
          console.log(err);
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      })
    );
  }

}

export const unauthorizedInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
];
