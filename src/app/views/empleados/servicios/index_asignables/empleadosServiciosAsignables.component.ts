import {
  IUser
} from './../../../../interfaces/IUser';
import {
  AuthService
} from './../../../../services/auth.service';



import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  Router
} from '@angular/router';

import {
  ActivatedRoute
} from '@angular/router';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  ImesCalendario
} from '../../../../interfaces/ImesCalendario';
import {
  EmpleadosService
} from '../../empleados.service';

import Swal from 'sweetalert2';
import { throwError } from 'rxjs';


@Component({
  templateUrl: 'empleadoServiciosAsignables.component.html',
  styleUrls: ['empleadosServiciosAsignables.component.css']

})

export class EmpleadoServiciosAsignablesComponent  {
  id: number;
  nombre: string;
  entidadSeleccionada: ImesCalendario;
  displayedColumns: string[] = ['ID', 'NOMBRE CLIENTE', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO', 'ACCIONES'];
  dataSource: MatTableDataSource < ImesCalendario > ;


  public router;
  public titleTable = "Servicios Asignables";
  public servicios = [];
  public user: IUser;
  public totalCargaHoraria;

  constructor(public fb: FormBuilder, public _router: Router, private authService: AuthService, private _service: EmpleadosService, public dialog: MatDialog, private route: ActivatedRoute) {


    this.router = _router;
    this.id = this.route.snapshot.params.id;
    this.nombre = this.route.snapshot.params.nombre;

    this.cargarTabla(_service);
    this.getUser(authService);

  }



  cargarTabla(service: EmpleadosService) {
    service.getServiciosAsignables()
      .subscribe((res: any) => {



        //    console.log(res)
        this.totalCargaHoraria = res.data.totalCargaHorario;

        this.servicios = res.data;

        // console.log(this.totalCargaHoraria)

      }, (error: any) => {
        console.log(" on error");
      }, () => {

        this.dataSource = new MatTableDataSource(this.servicios);

      })
  }




  getUser(authService) {
    authService.getUser().subscribe((res: any) => {

      this.user = res.data;
      // console.log(this.user)
    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })
  }
  asignarServicioAempleado(row) { // METODO PARA ABRIR EL DIALOG (MODAL)
    Swal.fire({
      title: 'Seguro de asignar el servicio?',
      text: 'Si confirma se le asignaran los horarios del servicio seleccionado al mes calendario laboral del empleado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.asignarServicio(row) ;




        }

   })


  }
  asignarServicio(row)
   {

    this
    .entidadSeleccionada = row;
    const parametrosAdicionales = {
      id_user: this.user.id_user,
      id_empleado: this.id
    }
    const params = {
      ...this.entidadSeleccionada,
      ...parametrosAdicionales
    }


    this._service.asignarServicioAempleado(params)
      .subscribe((res: any) => {

     if (res.estado==='error') {
      // console.log(res.data.code,res.data.errno)
     const mensajeError=res.data.code+  " " +res.data.errno
    // console.log(mensajeError)
     Swal.fire(
      'Ocurrio un error, consulte con el administrador del sistema',
      "Error: "+mensajeError,
      'error'
    )
     }else{
          Swal.fire(
          'Asignación de Servicio exitosa!',
          'Se enviará un email automatico noticando al cliente la asignacion del nuevo empleado',
          'success'
        )

        this.dataSource=null;
        this.cargarTabla(this._service);
     }

      }, (error: any) => {
        console.log(" on error");
      }, () => {



      })
  }





  volver() {
    this.router.navigate(['/empleados']);
  }



}
