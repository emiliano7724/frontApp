import { IUser } from './../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  rutaApi:string = environment.urlApi;

  authState = new BehaviorSubject(false);

  authenticate(){
    this.authState.next(true);
  };

  isAuthenticate(){
    return this.authState.value
  }

  logout(){
    localStorage.removeItem("token");
    this.authState.next(false);
  }
  getUser(): Observable<IUser>{

    return this.http.get<IUser>(this.rutaApi+"/users/getUser");
  }
  getImgUser(user:{}) {

    return this.http.post(this.rutaApi+"/archivos/getImg",user);
  }


}
