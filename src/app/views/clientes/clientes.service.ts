import { ICliente } from '../../interfaces/ICliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClientesService {



  constructor(private http:HttpClient) {}


getAll(): Observable<ICliente[]>{
  return this.http.get<ICliente[]>("http://localhost:3000/clientes/index")
}


store(dataForm:{}){
   return this.http.post<ICliente[]>("http://localhost:3000/clientes/create",dataForm)
}
update(dataForm:{}){
  console.log(dataForm);
   return this.http.put<ICliente[]>("http://localhost:3000/clientes/update",dataForm)
}
storeServicioCliente(dataForm:{}){
  return this.http.post<ICliente[]>("http://localhost:3000/servicios/create",dataForm)
}

}




