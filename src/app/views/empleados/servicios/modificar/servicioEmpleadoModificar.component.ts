import { IServicioFrecuenciaHoraria } from './../../../../interfaces/IServicioFrecuenciaHoraria';


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../empleados.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update',
  templateUrl: 'servicioEmpleadoModificar.component.html',
  styleUrls: ['servicioEmpleadoModificar.component.css']

})
export class ServicioEmpleadoModificarComponent {
  id: number;
  semana:number;
  nombre:string;
  router: Router;
  checked: boolean;




  public titleSingular = "Servicio del Empleado"
  public entidad: IServicioFrecuenciaHoraria;
  params: { id: number; semana: number; };


  constructor(public fb: FormBuilder,
    public _router: Router,
    private _service: EmpleadosService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location:Location

  ) {
    this.router = _router;

    this.id = this.route.snapshot.params.id;
    this.semana = this.route.snapshot.params.semana;
    this.nombre = this.route.snapshot.params.nombre;

     this.params = {

      id: this.id,
      semana:this.semana,

    }
    this.getEntidadById(this.params, _service);

  }


  formModificaEntidad = this.fb.group({

    hiLunes: [""],
    hfLunes: [""],
    hiMartes: [""],
    hfMartes: [""],
    hiMiercoles: [""],
    hfMiercoles: [""],
    hiJueves: [""],
    hfJueves: [""],
    hiViernes: [""],
    hfViernes: [""],
    hiSabado: [""],
    hfSabado: [""],
    hiDomingo: [""],
    hfDomingo: [""],

  })


  getEntidadById(params, service: EmpleadosService) {


    service.getFrecuenciaByIdySemana(params)
      .subscribe((res: any) => {

        this.entidad = res.data;
        console.log(this.entidad)

        this.formModificaEntidad = this.fb.group({


          hiLunes: [this.entidad.hiLunes],
          hfLunes: [this.entidad.hfLunes],
          hiMartes: [this.entidad.hiMartes],
          hfMartes: [this.entidad.hfMartes],
          hiMiercoles: [this.entidad.hiMiercoles],
          hfMiercoles: [this.entidad.hfMiercoles],
          hiJueves: [this.entidad.hiJueves],
          hfJueves: [this.entidad.hfJueves],
          hiViernes: [this.entidad.hiViernes],
          hfViernes: [this.entidad.hfViernes],
          hiSabado: [this.entidad.hiSabado],
          hfSabado: [this.entidad.hfSabado],
          hiDomingo: [this.entidad.hiDomingo],
          hfDomingo: [this.entidad.hfDomingo],

        })

      }, (_error: any) => {
        console.log(" on error");
      }, () => {

        //console.log(this.entidad)

      })



  }

  registro() {

    if (this.formModificaEntidad.valid) {

      Swal.fire({
        title: 'Seguro de realizar cambios en ' + this.titleSingular + '?',
        text: 'Si confirma se modificará el  ' + this.titleSingular + ' en la base de datos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.updateEntidad(this._service);

        }

      })

    } else {
      Swal.fire(
        'Error de validación de formulario',
        "Error: Verifique los errores y requerimientos resaltados en el formulario",
        'error'
      )
    }
  }


  updateEntidad(_service: EmpleadosService) {


 const data ={
  ...this.formModificaEntidad.value,
...this.params
    }
    _service.updateByIdySemana(data).subscribe((res: any) => {

      if (res.estado === "error") {
        //    console.log(res.data.sqlMessage)
        const mensajeError = res.data.code + " " + res.data.errno
        Swal.fire(
          'Ocurrió un error, consulte con el administrador del sistema',
          "Error: " + mensajeError,
          'error'
        )
      } else {
        Swal.fire(
          'Operación exitosa!',
          'Cambios realizados correctamente en ' + this.titleSingular,
          'success'
        )
      }
    })
  }

  volver() {
    this.location.back()
  }


}




