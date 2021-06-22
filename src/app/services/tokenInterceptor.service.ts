import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //const token = localStorage.getItem("token");
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7fSwiaWF0IjoxNjIzNjc2ODExLCJleHAiOjE2MjYyNjg4MTF9.iV3QDIAdxvxoBAD-KKM_y_QH7fE46Hm3eeehhp7l20I";
    if(token){
      request = request.clone({headers: request.headers.set('x-token',token)})
    };

    request.clone({headers: request.headers.set('Accept', 'application/json')});
    return next.handle(request).pipe(
      map((event: HttpEvent<any>)=>{
        if(event instanceof HttpResponse){

        }
        return event
      }))
    // return next.handle(request);
  }



}
