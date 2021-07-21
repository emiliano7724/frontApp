import { IEmpleado } from './../../../interfaces/IEmpleado';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: 'empleadosModificar.component.html',
  styleUrls: ['empleadosModificar.component.css']

})
export class EmpleadosModificarComponent {
  id: number;
  router: Router;
  checked: boolean;




  public titleSingular = "Empleado"
  public entidad: IEmpleado;
  user: IUser;


  constructor(public authService: AuthService,public fb: FormBuilder,
    public _router: Router,
    private _service: EmpleadosService,
    public dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.getUser();
    this.router = _router;

    this.id = this.route.snapshot.params.id;

    const params = {
      id: this.id
    }
    this.getEntidadById(params, _service);

  }
  getUser() {
    this.authService.getUser().subscribe((res: any) => {

      this.user=res.data;

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })
  }


  formModificaEntidad = this.fb.group({
    nombre: ["", [Validators.required, Validators.maxLength(150)]],
    telefono: ["", Validators.required],
    email_empleado: ["", [Validators.required, Validators.email]],
    id_localidad: ["", [Validators.required]],
    direccion: ["", [Validators.required]],
    cuit: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    dni: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    estado: [""],
    precio_hora: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_tipo_empleado: ["", [Validators.required]],
    foto: ["", [Validators.required, Validators.maxLength(150)]],
    id_empleado:["",  [Validators.required]],


  })


  getEntidadById(params, service: EmpleadosService) {

    service.getById(params)
      .subscribe((res: any) => {

        this.entidad = res.data;
        if (this.entidad.deleted_at_emp) {
          this.entidad.estado = false;
          this.checked=false
        } else {
          this.entidad.estado = true;
          this.checked=true
        }
        this.formModificaEntidad.get('nombre')?.setValue(this.entidad.nombre);
        this.formModificaEntidad.get('telefono')?.setValue(this.entidad.telefono);
        this.formModificaEntidad.get('email_empleado')?.setValue(this.entidad.email_empleado)
        this.formModificaEntidad.get('id_localidad')?.setValue(String(this.entidad.id_localidad))
        this.formModificaEntidad.get('direccion')?.setValue(this.entidad.direccion)
        this.formModificaEntidad.get('cuit')?.setValue(this.entidad.cuit)
        this.formModificaEntidad.get('dni')?.setValue(this.entidad.dni)
        this.formModificaEntidad.get('precio_hora')?.setValue(this.entidad.precio_hora)
        this.formModificaEntidad.get('id_tipo_empleado')?.setValue(String(this.entidad.id_tipo_empleado))
        this.formModificaEntidad.get('foto')?.setValue(this.entidad.foto)
        this.formModificaEntidad.get('estado')?.setValue(this.entidad.estado)
        this.formModificaEntidad.get('id_empleado')?.setValue(this.entidad.id_empleado)
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
    const params={
      ...this.formModificaEntidad.value,
      ...this.user
     }
     console.log(params)
    _service.update(params).subscribe((res: any) => {
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
    this.router.navigate(['/empleados']);
  }



}




