import { ICliente } from '../../interfaces/ICliente';
import { IEmpleado } from '../../interfaces/IEmpleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';


@Injectable()
export class MiCuentaService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getMiUsuario(): Observable<IUser> {
    return this.http.get<IUser>(this.rutaApi+"/users/getMiUsuario")
  }

  updateMisdatosUsuario(dataForm: {}):Observable<IUser> {
    return this.http.put<IUser>(this.rutaApi+"/users/update", dataForm)
  }

  updatePassword(dataForm: {}):Observable<IUser> {
    return this.http.put<IUser>(this.rutaApi+"/users/updatePassword", dataForm)
  }
  sendFile(imagen:FormData){
    console.log(imagen)
    return this.http.post(this.rutaApi+"/archivos/upload/", imagen,{});
  }

}



