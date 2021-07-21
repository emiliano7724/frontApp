import { ImesCalendario } from './../../interfaces/ImesCalendario';
import { IEmpleado } from './../../interfaces/IEmpleado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServicioFrecuenciaHoraria } from '../../interfaces/IServicioFrecuenciaHoraria';

@Injectable()
export class EmpleadosService {



  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000";

  getAll(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(this.rutaApi+"/empleados/index")
  }
  getById(params:{}): Observable<IEmpleado> {

    return this.http.post<IEmpleado>(this.rutaApi+"/empleados/edit",params)
  }

  store(dataForm: {}) {
    return this.http.post<IEmpleado[]>(this.rutaApi+"/empleados/create", dataForm)
  }
  update(dataForm: {}) {

   // console.log(dataForm)
    return this.http.put<IEmpleado[]>(this.rutaApi+"/empleados/update", dataForm)
  }


  getMesCalendarioEmpleado(params:{}): Observable<ImesCalendario[]> {

    return this.http.post<ImesCalendario[]>(this.rutaApi+"/servicios/getMesCalendario",params)
  }

  getFrecuenciaByIdySemana(params:{}): Observable<IServicioFrecuenciaHoraria> {

    return this.http.post<IServicioFrecuenciaHoraria>(this.rutaApi+"/servicios/getFrecuenciaByIdySemana",params)
  }


  getServiciosAsignables(): Observable<IServicioFrecuenciaHoraria[]> {

    return this.http.get<IServicioFrecuenciaHoraria[]>(this.rutaApi+"/servicios/verServiciosAsignables")
  }

  storeServicioCliente(dataForm: {}) {
    return this.http.post<IEmpleado[]>(this.rutaApi+"/servicios/create", dataForm)
  }


  asignarServicioAempleado(data:{}) {


    return this.http.put(this.rutaApi+"/servicios/asignarServicioAempleado/", data)
  }
  updateByIdySemana(data:{}) {

console.log(data)
    return this.http.put(this.rutaApi+"/servicios/updateByIdySemana/", data)
  }




}




