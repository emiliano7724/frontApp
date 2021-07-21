import { ICliente } from './../../interfaces/ICliente';
import { IEmpleado } from '../../interfaces/IEmpleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class DashboardService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getEmpleadosActivos(): Observable<Number> {
    return this.http.get<Number>(this.rutaApi+"/dashboard/getEmpleadosActivos")
  }

  getEmpleadosActivosSinServicios(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(this.rutaApi+"/dashboard/getEmpleadosActivosSinServicios")
  }
  getClientesActivos(): Observable<Number> {
    return this.http.get<Number>(this.rutaApi+"/dashboard/getClientesActivos")
  }

  getClientesActivosSinServicios(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.rutaApi+"/dashboard/getClientesActivosSinServicios")
  }

}



