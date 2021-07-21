import { IUser } from './../../../interfaces/IUser';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsuariosService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.rutaApi+"/users/index")
  }
  getById(params:{}): Observable<IUser> {

    return this.http.post<IUser>(this.rutaApi+"/users/edit",params)
  }

  store(dataForm: {}) {
    return this.http.post<IUser[]>(this.rutaApi+"/users/create", dataForm)
  }
  update(dataForm: {}) {

    return this.http.put<IUser[]>(this.rutaApi+"/users/update", dataForm)
  }



}




