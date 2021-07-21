
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { MatFileUploadComponent } from 'angular-material-fileupload';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces/IUser';
import Swal from 'sweetalert2';


@Component({
  templateUrl: 'empleadosNuevo.component.html',
  styleUrls: ['empleadosNuevo.component.css']

})

export class EmpleadosNuevoComponent implements OnInit {

  public user:IUser;
  public router:Router;
  public titleSingular = "Empleado";
  constructor(public authService: AuthService,public fb: FormBuilder, public _router: Router, private _service: EmpleadosService, public dialog: MatDialog,) {
    this.getUser();
    this.router = _router;

  }


  getUser() {
    this.authService.getUser().subscribe((res: any) => {

      this.user=res.data;

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })
  }

  storeEntidad(_service: EmpleadosService) {

    const params={
      ...this.formNuevaEntidad.value,
      ...this.user
     }
console.log(params)
    _service.store(params).subscribe((res: any) => {

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
          'Se ha creado un nuevo ' + this.titleSingular,
          'success'
        )
      }

    })
  }



  formNuevaEntidad = this.fb.group({
    nombre: ["empleadoDesdeForm", [Validators.required, Validators.maxLength(150)]],
    telefono: ["45654521DesdeForm", Validators.required],
    email_empleado: ["emilianoDesdeForm@gmail.com", [Validators.required, Validators.email]],
    id_localidad: ["1", [Validators.required]],
    direccion: ["25 de mayo DesdeForm", [Validators.required]],
    id_tipo_empleado: ["2", [Validators.required]],
    cuit: ["20339626724", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    dni: [33962672, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    precio_hora: [350, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    foto: ["assets/img/avatars/4.jpg", [Validators.required, Validators.maxLength(150)]],


  })

  registro() {

    if (this.formNuevaEntidad.valid) {
      Swal.fire({
        title: 'Seguro de crear nuevo ' + this.titleSingular + '?',
        text: 'Si confirma un nuevo ' + this.titleSingular + ' será creado en la base de datos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

         this.storeEntidad(this._service);

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
s
 validaEmail() {
    if (this.formNuevaEntidad.get('email_empleado').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formNuevaEntidad.get('email_empleado').hasError('email_empleado') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formNuevaEntidad.get('nombre').hasError('required')
      || this.formNuevaEntidad.get('telefono').hasError('required')
      || this.formNuevaEntidad.get('cuit').hasError('required')
      || this.formNuevaEntidad.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }


  ngOnInit(): void {
  }
  volver() {
    this.router.navigate(['/empleados']);
  }



}
