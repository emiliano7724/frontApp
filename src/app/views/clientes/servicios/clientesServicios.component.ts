import { DialogMensajeComponent } from '../../mensajeDialog/mensajeDialog.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { ICliente } from '../../../interfaces/ICliente';


@Component({
  templateUrl: 'clientesServicios.component.html',
  styleUrls: ['clientesServicios.component.css']

})

export class ClientesServiciosComponent implements OnInit {
  cliente: ICliente;

  formServicioCliente = this.fb.group({
    id_usr: [this.getIdUserLogueado()],
    id_cliente: [2],
    hiLunes: ["" ],
    hfLunes: ["" ],
    hiMartes: ["" ],
    hfMartes: ["" ],
    hiMiercoles: ["" ],
    hfMiercoles: ["" ],
    hiJueves: ["" ],
    hfJueves: ["" ],
    hiViernes: ["" ],
    hfViernes: ["" ],
    hiSabado: ["" ],
    hfSabado: ["" ],
    hiDomingo: ["" ],
    hfDomingo: ["" ],

  })



  getIdUserLogueado(): Number {
    return 1;
  }

  public router;
  public titleSingular = "Cliente"
  constructor(public fb: FormBuilder,
    public _router: Router,
    private _clientesService: ClientesService,
    public dialog: MatDialog) {

    this.router = _router;

  }

  updateEntidad(_clientesService: ClientesService) {

   console.log(this.formServicioCliente.value)
    _clientesService.storeServicioCliente(this.formServicioCliente.value).subscribe((res: any) => {

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





  registro() {

    if (this.formServicioCliente.valid) {
      this.updateEntidad(this._clientesService);

    } else {
    //this.openDialog("Complete correctamente el formulario")
    }
  }






  validaEmail() {
    if (this.formServicioCliente.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formServicioCliente.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formServicioCliente.get('nombre').hasError('required')
      || this.formServicioCliente.get('telefono').hasError('required')
      || this.formServicioCliente.get('cuit').hasError('required')
      || this.formServicioCliente.get('direccion').hasError('required')


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
