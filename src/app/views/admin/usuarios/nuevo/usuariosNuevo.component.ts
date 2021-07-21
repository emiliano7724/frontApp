
import {
  Component,
  OnInit
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

import Swal from 'sweetalert2';
import { IUser } from '../../../../interfaces/IUser';
import { AuthService } from '../../../../services/auth.service';
import { UsuariosService } from '../usuarios.service';




@Component({
  templateUrl: 'usuariosNuevo.component.html',
  styleUrls: ['usuariosNuevo.component.css']

})

export class UsuariosNuevoComponent implements OnInit {
  public user:IUser;
  public router: Router;
  public titleSingular = "Usuario";
  constructor(public authService: AuthService,public fb: FormBuilder, public _router: Router, private _usuariosService: UsuariosService, public dialog: MatDialog, ) {
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
  storeEntidad(_usuariosService: UsuariosService) {



  // console.log(params)
    _usuariosService.store(this.formNuevaEntidad.value).subscribe((res: any) => {

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
    name: ["usernuevo", [Validators.required, Validators.maxLength(150)]],
    email: ["usernuevo@gmail.com", [Validators.required, Validators.email]],
    telefono: ["155852741", [Validators.required]],
    password: ["123", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_rol: ["2", [Validators.required]],
    id_empresa: ["2", [Validators.required]],
  })

  registro() {

    if (this.formNuevaEntidad.valid) {

      Swal.fire({
        title: 'Seguro de crear nuevo ' + this.titleSingular + '?',
        text: 'Si confirma un nuevo ' + this.titleSingular + ' será creado en la base de datos, se creara una contraseña por "defecto 123" que el usuario debera cambiar al ingresar, ademas podra poner una imagen de avatar desde la administracion de su cuenta',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

         this.storeEntidad(this._usuariosService);

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

  validaEmail() {
    if (this.formNuevaEntidad.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formNuevaEntidad.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formNuevaEntidad.get('name').hasError('required') ||
      this.formNuevaEntidad.get('telefono').hasError('required')||
      this.formNuevaEntidad.get('password').hasError('required')



    ) {
      return 'Campo Obligatorio';
    }


  }


  ngOnInit(): void {}
  volver() {
    this.router.navigate(['/admin/usuarios']);
  }



}
