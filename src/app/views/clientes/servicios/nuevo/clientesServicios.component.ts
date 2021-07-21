
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
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';
import Swal from 'sweetalert2';


@Component({
  templateUrl: 'clientesServicios.component.html',
  styleUrls: ['clientesServicios.component.css']

})

export class ClientesNuevoServiciosComponent  {
  public user:IUser;
  id: number=null;
  displayedColumns: string[] = ['ID_CLIENTE', 'NOMBRE','DIRECCION', 'TELEFONO', 'ACCIONES'];
  dataSource: MatTableDataSource<ICliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cliente: ICliente;

  formServicioCliente = this.fb.group({


    hiLunes: [],
    hfLunes: [],
    hiMartes: [],
    hfMartes: [],
    hiMiercoles: ["08:00"],
    hfMiercoles: ["19:00"],
    hiJueves: [],
    hfJueves: [],
    hiViernes: ["08:00"],
    hfViernes: ["19:00"],
    hiSabado: [],
    hfSabado: [],
    hiDomingo: [],
    hfDomingo: [],

  })



  public router;
  public titleSingular = " Servicio Cliente";
  public servicios = [];


  constructor(public authService: AuthService,public fb: FormBuilder,
    public _router: Router,
    private _clientesService: ClientesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location:Location) {

      this.getUser();
    this.router = _router;
    this.id = this.route.snapshot.params.id;



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

const id={
  id_cliente:this.id
}
    const params={
      ...this.formServicioCliente.value,
      ...this.user,
      ...id

     }
     console.log(params)
    _clientesService.storeServicioCliente(params).subscribe((res: any) => {

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

  registro() {

    if (this.formServicioCliente.valid) {
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


