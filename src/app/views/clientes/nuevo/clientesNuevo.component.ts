import { DialogMensajeComponent } from './../../mensajeDialog/mensajeDialog.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';


@Component({
  templateUrl: 'clientesNuevo.component.html',
  styleUrls: ['clientesNuevo.component.css']

})

export class ClientesNuevoComponent implements OnInit {
  getIdUserLogueado(): Number {
    return 1;
  }

  public router;
  public titleSingular = "Cliente"
  constructor(public fb: FormBuilder, public _router: Router, private _clientesService: ClientesService, public dialog: MatDialog,) {

    this.router = _router;

  }

  storeEntidad(_clientesService: ClientesService) {
    _clientesService.store(this.formNuevoCliente.value).subscribe((res: any) => {

      if (res.estado == "error") {
    //    console.log(res.data.sqlMessage)
        this.openDialog(res)
      } else {
        this.openDialog(res)
      }

    })
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


  formNuevoCliente = this.fb.group({
    nombre: ["tes1", [Validators.required, Validators.maxLength(150)]],
    telefono: ["45654521", Validators.required],
    email: ["emiliano@gmail.com", [Validators.required, Validators.email]],
    id_localidad: ["1", [Validators.required]],
    direccion: ["25 de mayo 1221", [Validators.required]],
    id_categoria_iva: ["2", [Validators.required]],
    cuit: ["20339626724", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_user: [this.getIdUserLogueado()]
  })

  registro() {

    if (this.formNuevoCliente.valid) {
      this.storeEntidad(this._clientesService);

    } else {
    //this.openDialog("Complete correctamente el formulario")
    }
  }
s
 validaEmail() {
    if (this.formNuevoCliente.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formNuevoCliente.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formNuevoCliente.get('nombre').hasError('required')
      || this.formNuevoCliente.get('telefono').hasError('required')
      || this.formNuevoCliente.get('cuit').hasError('required')
      || this.formNuevoCliente.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }


  ngOnInit(): void {
  }
  volver() {
    this.router.navigate(['/clientes']);
  }



}
