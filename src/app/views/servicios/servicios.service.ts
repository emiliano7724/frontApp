import { ImesCalendario } from '../../interfaces/ImesCalendario';
import { IEmpleado } from '../../interfaces/IEmpleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServicioFrecuenciaHoraria } from '../../interfaces/IServicioFrecuenciaHoraria';

@Injectable()
export class ServiciosService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getMesCalendarioTodosLosServcios(): Observable<ImesCalendario[]> {
    return this.http.get<ImesCalendario[]>(this.rutaApi+"/servicios/getMesCalendarioTodosLosServcios")
  }

}




