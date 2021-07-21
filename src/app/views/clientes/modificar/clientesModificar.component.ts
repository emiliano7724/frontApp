import { IUser } from './../../../interfaces/IUser';
import { ICliente } from './../../../interfaces/ICliente';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: 'clientesModificar.component.html',
  styleUrls: ['clientesModificar.component.css']

})
export class ClientesModificarComponent {
  id: number;
  router: Router;
  checked: boolean;



  public titleSingular = "Cliente"
  public entidad: ICliente;
  user: IUser;


  constructor(public authService: AuthService,public fb: FormBuilder,
    public _router: Router,
    private _clientesService: ClientesService,
    public dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.getUser();
    this.router = _router;

    this.id = this.route.snapshot.params.id;

    const params = {
      id: this.id
    }
    this.getEntidadById(params, _clientesService);

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
    email_cliente: ["", [Validators.required, Validators.email]],
    id_localidad: ["", [Validators.required]],
    direccion: ["", [Validators.required]],
    id_categoria_iva: ["", [Validators.required]],
    cuit: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_cliente: [""],
    estado: [""]
  })


  getEntidadById(params, service: ClientesService) {

    service.getById(params)
      .subscribe((res: any) => {

        this.entidad = res.data;
        if (this.entidad.deleted_at_cli) {
          this.entidad.estado = false;
          this.checked=false
        } else {
          this.entidad.estado = true;
          this.checked=true
        }
        this.formModificaEntidad.get('nombre')?.setValue(this.entidad.nombre);
        this.formModificaEntidad.get('telefono')?.setValue(this.entidad.telefono);
        this.formModificaEntidad.get('email_cliente')?.setValue(this.entidad.email_cliente)
        this.formModificaEntidad.get('id_localidad')?.setValue(String(this.entidad.id_localidad))
        this.formModificaEntidad.get('direccion')?.setValue(this.entidad.direccion)
        this.formModificaEntidad.get('id_categoria_iva')?.setValue(String(this.entidad.id_categoria_iva))
        this.formModificaEntidad.get('cuit')?.setValue(this.entidad.cuit)
        this.formModificaEntidad.get('id_cliente')?.setValue(this.entidad.id_cliente)
        this.formModificaEntidad.get('estado')?.setValue(this.entidad.estado)


      }, (_error: any) => {
        console.log(" on error");
      }, () => {

        //console.log(this.entidad)

      })



  }

  validaEmail() {
    if (this.formModificaEntidad.get('email_cliente').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formModificaEntidad.get('email_cliente').hasError('email_cliente') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formModificaEntidad.get('nombre').hasError('required')
      || this.formModificaEntidad.get('telefono').hasError('required')
      || this.formModificaEntidad.get('cuit').hasError('required')
      || this.formModificaEntidad.get('direccion').hasError('required')


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

          this.updateEntidad(this._clientesService);

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


  updateEntidad(_clientesService: ClientesService) {


    const params={
      ...this.formModificaEntidad.value,
      ...this.user
     }
     console.log(params)
    _clientesService.update(params).subscribe((res: any) => {
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
    this.router.navigate(['/clientes']);
  }



}




