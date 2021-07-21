import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { throwError, TimeoutError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  rutaApi:string = environment.urlApi;
  time_out= 50000

  login(loginForm:{}){

try {
  return this.http.post(this.rutaApi+"/users/login", loginForm)
  .pipe(
    timeout(this.time_out)
  )
} catch (error) {
  if (error instanceof TimeoutError) {
    console.log(error)
    return throwError('Timeout Exception');
 }
}

  }

}
