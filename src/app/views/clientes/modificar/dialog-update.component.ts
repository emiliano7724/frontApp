import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICliente } from '../../../interfaces/ICliente';
import { DialogMensajeComponent } from '../../mensajeDialog/mensajeDialog.component';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: 'clientesModificar.component.html',
  styleUrls:['clientesModificar.component.css']

})
export class DialogUpdateComponent  {


  public titleModal = "Cliente";
  constructor(public fb: FormBuilder, public _router: Router, private _clientesService: ClientesService,public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICliente) {}


    formModificaCliente = this.fb.group({
      nombre: [this.data.nombre, [Validators.required, Validators.maxLength(150)]],
      telefono: [this.data.telefono, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      id_localidad: [String(this.data.id_localidad), [Validators.required]],
      direccion: [this.data.direccion, [Validators.required]],
      id_categoria_iva: [String(this.data.id_categoria_iva), [Validators.required]],
      cuit: [this.data.cuit, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
      id_user: [1],
      id_cliente: [this.data.id_cliente]
    })



  validaEmail() {
    if (this.formModificaCliente.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formModificaCliente.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formModificaCliente.get('nombre').hasError('required')
      || this.formModificaCliente.get('telefono').hasError('required')
      || this.formModificaCliente.get('cuit').hasError('required')
      || this.formModificaCliente.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }
  registro() {

    if (this.formModificaCliente.valid) {
      this.updateEntidad(this._clientesService);

    } else {
    //this.openDialog("Complete correctamente el formulario")
    }
  }
  updateEntidad(_clientesService: ClientesService) {
    _clientesService.update(this.formModificaCliente.value).subscribe((res: any) => {
console.log(res)
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

}
