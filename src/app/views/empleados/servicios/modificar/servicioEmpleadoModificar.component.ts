import { IServicioFrecuenciaHoraria } from './../../../../interfaces/IServicioFrecuenciaHoraria';


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../empleados.service';
import { DialogMensajeComponent } from '../../mensajeDialog/mensajeDialog.component';

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

  getIdUserLogueado(): number {
    return 1;
  }


  public titleSingular = "Servicio del Empleado"
  public entidad: IServicioFrecuenciaHoraria;


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

    const params = {

      id: this.id,
      semana:this.semana,

    }
    this.getEntidadById(params, _service);

  }


  formModificaEntidad = this.fb.group({
    id_usr: [this.getIdUserLogueado()],
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
          id_usr: [this.getIdUserLogueado()],

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

  validaEmail() {
    if (this.formModificaEntidad.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formModificaEntidad.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formModificaEntidad.get('nombre').hasError('required')
      || this.formModificaEntidad.get('telefono').hasError('required')
      || this.formModificaEntidad.get('cuit').hasError('required')
      || this.formModificaEntidad.get('direccion').hasError('required')
      || this.formModificaEntidad.get('precio_hora').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }
  registro() {

    if (this.formModificaEntidad.valid) {

      this.updateEntidad(this._service);

    } else {

      this.openDialog("Complete correctamente el formulario")
    }
  }


  updateEntidad(_service: EmpleadosService) {

    console.log(this.formModificaEntidad.value);
    _service.update(this.formModificaEntidad.value).subscribe((res: any) => {
      //console.log(res)
      /*  if (res.estado == "error") {
         //    console.log(res.data.sqlMessage)
         this.openDialog(res)
       } else {

         this.openDialog(res)

       } */
      this.openDialog(res);

    })
  }

  volver() {
    this.location.back()
  }

  openDialog(data) {  // METODO PARA ABRIR EL DIALOG (MODAL)
    //console.log(data)
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      width: '500px',
      height: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}




