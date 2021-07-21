

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';



import Swal from 'sweetalert2';
import { ImesCalendario } from '../../../interfaces/ImesCalendario';
import { ServiciosService } from '../servicios.service';
import { EmpleadosService } from '../../empleados/empleados.service';


@Component({
  templateUrl: 'servicios.component.html',
  styleUrls: ['servicios.component.css']

})

export class ServiciosComponent implements OnInit {
  id: number;
  nombre: string;
  entidadSeleccionada: ImesCalendario;
  displayedColumns: string[] = ['ID_SERVICIO', 'NOMBRE CLIENTE', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO', 'ACCIONES'];
  dataSourceS1: MatTableDataSource<ImesCalendario>;
  dataSourceS2: MatTableDataSource<ImesCalendario>;
  dataSourceS3: MatTableDataSource<ImesCalendario>;
  dataSourceS4: MatTableDataSource<ImesCalendario>;
  semanas = [1, 2, 3, 4]


  public router;
  public titleTable = "Servicios Activos";
  public serviciosS1 = [];
  public serviciosS2 = [];
  public serviciosS3 = [];
  public serviciosS4 = [];
  public totalCargaHoraria;

  constructor(public fb: FormBuilder, public _router: Router, private _service: ServiciosService, public dialog: MatDialog, private route: ActivatedRoute) {


    this.router = _router;

    this.cargarTabla( _service);


  }

  cargarTabla( service: ServiciosService) {
    service.getMesCalendarioTodosLosServcios()
      .subscribe((res: any) => {
       if (res.data) {
        this.totalCargaHoraria = res.data.totalCargaHorario;

        this.serviciosS1 = res.data.mes.s1
        this.serviciosS2 = res.data.mes.s2
        this.serviciosS3 = res.data.mes.s3
        this.serviciosS4 = res.data.mes.s4
        this.dataSourceS1 = new MatTableDataSource(this.serviciosS1);
        this.dataSourceS2 = new MatTableDataSource(this.serviciosS2);
        this.dataSourceS3 = new MatTableDataSource(this.serviciosS3);
        this.dataSourceS4 = new MatTableDataSource(this.serviciosS4);
       }else{

        Swal.fire("Aun no poseen servicios, cree nuevos servicios y asignelos a los empleados");
       }

        // console.log(this.totalCargaHoraria)

      }, (error: any) => {
        console.log(" on error");
      }, () => {


      })
  }


  ngOnInit(): void {
  }

  irAServiciosAsignables () {




    this.router.navigate(['empleados/servicios/asignables/' + this.id+"/"+this.nombre]);
  }

  irAFormModificarServicio(row, semana) {


    this.entidadSeleccionada = row;


    this.router.navigate(['/empleados/modificarServicio/' + this.entidadSeleccionada.id_frecuencia_horaria + '/' + semana+ '/' + this.nombre]);
  }
  volver() {
    this.router.navigate(['/servicios']);
  }



}



