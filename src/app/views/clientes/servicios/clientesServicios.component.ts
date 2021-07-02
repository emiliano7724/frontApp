import { DialogMensajeComponent } from '../../empleados/mensajeDialog/mensajeDialog.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { ICliente } from '../../../interfaces/ICliente';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: 'clientesServicios.component.html',
  styleUrls: ['clientesServicios.component.css']

})

export class ClientesServiciosComponent implements OnInit {
  id: number;
  displayedColumns: string[] = ['ID_CLIENTE', 'NOMBRE','DIRECCION', 'TELEFONO', 'ACCIONES'];
  dataSource: MatTableDataSource<ICliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cliente: ICliente;

  formServicioCliente = this.fb.group({
    id_usr: [this.getIdUserLogueado()],
    id_cliente: [""],
    hiLunes: ["10:30"],
    hfLunes: ["12:45"],
    hiMartes: ["10:30"],
    hfMartes: ["12:45"],
    hiMiercoles: ["10:30"],
    hfMiercoles: ["12:45"],
    hiJueves: ["10:30"],
    hfJueves: ["12:45"],
    hiViernes: ["10:30"],
    hfViernes: ["12:45"],
    hiSabado: ["10:30"],
    hfSabado: ["12:45"],
    hiDomingo: ["10:30"],
    hfDomingo: ["12:45"],

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
    private route: ActivatedRoute) {

    this.router = _router;
    this.id = this.route.snapshot.params.id;


    this.formServicioCliente = this.fb.group({
      id_usr: [this.getIdUserLogueado()],
      id_cliente: [this.id],
      hiLunes: ["10:30"],
      hfLunes: ["12:45"],
      hiMartes: ["10:30"],
      hfMartes: ["12:45"],
      hiMiercoles: ["10:30"],
      hfMiercoles: ["12:45"],
      hiJueves: ["10:30"],
      hfJueves: ["12:45"],
      hiViernes: ["10:30"],
      hfViernes: ["12:45"],
      hiSabado: ["10:30"],
      hfSabado: ["12:45"],
      hiDomingo: ["10:30"],
      hfDomingo: ["12:45"],

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


  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    cargarTabla(this._clientesService,this.servicios,this.dataSource,this.sort,this.paginator);
  }
  volver() {
    this.router.navigate(['/clientes']);
  }



}

function cargarTabla(service: ClientesService, servicios, dataSource,sort,paginator) {
  service.getAll()
      .subscribe((res: any) => {
console.log(res.data)
        servicios = res.data


      }, (error: any) => {
        console.log(" on error");
      }, () => {

        dataSource = new MatTableDataSource(servicios);
        dataSource.paginator = paginator;

        dataSource.sort = sort;

      })
}

