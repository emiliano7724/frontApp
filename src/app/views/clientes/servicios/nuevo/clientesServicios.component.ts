
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ICliente } from '../../../../interfaces/ICliente';
import { ClientesService } from '../../clientes.service';
import { DialogMensajeComponent } from '../../mensajeDialog/mensajeDialog.component';

@Component({
  templateUrl: 'clientesServicios.component.html',
  styleUrls: ['clientesServicios.component.css']

})

export class ClientesNuevoServiciosComponent  {
  id: number;
  displayedColumns: string[] = ['ID_CLIENTE', 'NOMBRE','DIRECCION', 'TELEFONO', 'ACCIONES'];
  dataSource: MatTableDataSource<ICliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cliente: ICliente;

  formServicioCliente = this.fb.group({
    id_usr: [this.getIdUserLogueado()],
    id_cliente: [""],
    hiLunes: [""],
    hfLunes: [""],
    hiMartes: [""],
    hfMartes: [""],
    hiMiercoles: ["08:00"],
    hfMiercoles: ["14:00"],
    hiJueves: [""],
    hfJueves: [""],
    hiViernes: ["08:00"],
    hfViernes: ["14:00"],
    hiSabado: [""],
    hfSabado: [""],
    hiDomingo: [""],
    hfDomingo: [""],

  })

  getIdUserLogueado(): Number {
    return 1;
  }

  public router;
  public titleSingular = "Cliente";
  public servicios = [];


  constructor(public fb: FormBuilder,
    public _router: Router,
    private _clientesService: ClientesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location:Location) {

    this.router = _router;
    this.id = this.route.snapshot.params.id;


    this.formServicioCliente = this.fb.group({
      id_usr: [this.getIdUserLogueado()],
      id_cliente: [""],
      hiLunes: [""],
      hfLunes: [""],
      hiMartes: [""],
      hfMartes: [""],
      hiMiercoles: ["08:00"],
      hfMiercoles: ["14:00"],
      hiJueves: [""],
      hfJueves: [""],
      hiViernes: ["08:00"],
      hfViernes: ["14:00"],
      hiSabado: [""],
      hfSabado: [""],
      hiDomingo: [""],
      hfDomingo: [""],

    })

  }

  storeEntidad(_clientesService: ClientesService) {

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
      this.storeEntidad(this._clientesService);

    } else {
      //this.openDialog("Complete correctamente el formulario")
    }
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



  volver() {

    this.location.back()
  }


}


