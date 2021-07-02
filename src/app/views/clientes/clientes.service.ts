import { ICliente } from '../../interfaces/ICliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientesService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getAll(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.rutaApi+"/clientes/index")
  }
  getById(params:{}): Observable<ICliente> {

    return this.http.post<ICliente>(this.rutaApi+"/clientes/edit",params)
  }

  store(dataForm: {}) {
    return this.http.post<ICliente[]>(this.rutaApi+"/clientes/create", dataForm)
  }
  update(dataForm: {}) {

    return this.http.put<ICliente[]>(this.rutaApi+"/clientes/update", dataForm)
  }

  getServicioDelCliente(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.rutaApi+"/clientes/index")
  }


  storeServicioCliente(dataForm: {}) {
    return this.http.post<ICliente[]>("http://localhost:3000/servicios/create", dataForm)
  }

}




