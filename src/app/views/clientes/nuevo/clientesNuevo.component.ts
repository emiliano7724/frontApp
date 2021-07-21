
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
import {
  ClientesService
} from '../clientes.service';
import Swal from 'sweetalert2';
import { IUser } from '../../../interfaces/IUser';
import { AuthService } from '../../../services/auth.service';


@Component({
  templateUrl: 'clientesNuevo.component.html',
  styleUrls: ['clientesNuevo.component.css']

})

export class ClientesNuevoComponent implements OnInit {
  public user:IUser;
  public router: Router;
  public titleSingular = "Cliente";
  constructor(public authService: AuthService,public fb: FormBuilder, public _router: Router, private _clientesService: ClientesService, public dialog: MatDialog, ) {
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
  storeEntidad(_clientesService: ClientesService) {


   const params={
    ...this.formNuevaEntidad.value,
    ...this.user
   }
  // console.log(params)
    _clientesService.store(params).subscribe((res: any) => {

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
    nombre: ["test1", [Validators.required, Validators.maxLength(150)]],
    telefono: ["45654521", Validators.required],
    email_cliente: ["mailgustavo@gmail.com", [Validators.required, Validators.email]],
    id_localidad: ["1", [Validators.required]],
    direccion: ["25 de mayo 1221", [Validators.required]],
    id_categoria_iva: ["2", [Validators.required]],
    cuit: ["20339626724", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_user: []
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

         this.storeEntidad(this._clientesService);

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
      this.formNuevaEntidad.get('nombre').hasError('required') ||
      this.formNuevaEntidad.get('telefono').hasError('required') ||
      this.formNuevaEntidad.get('cuit').hasError('required') ||
      this.formNuevaEntidad.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }


  ngOnInit(): void {}
  volver() {
    this.router.navigate(['/clientes']);
  }



}
