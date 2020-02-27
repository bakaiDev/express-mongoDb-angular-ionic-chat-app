import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    };
    const token = this.tokenService.getToken();
    if (token) {
      headerConfig.Authorization = `bearer ${token}`;
    }
    const newReq = req.clone({setHeaders: headerConfig});
    return next.handle(newReq);
  }
}
