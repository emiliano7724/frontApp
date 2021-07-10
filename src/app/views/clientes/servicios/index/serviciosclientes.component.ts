import { IServicioFrecuenciaHoraria } from './../../../../interfaces/IServicioFrecuenciaHoraria';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from '../../clientes.service';
import { DialogAmpliarInfoComponent } from '../../index/dialogAmpliarInfo.component';




@Component({
  templateUrl: 'serviciosclientes.component.html',
  styleUrls: ['serviciosclientes.component.css']
})

export class ClientesServiciosComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['ID', 'HILUNES', 'HFLUNES', 'HIMARTES', 'HFMARTES', 'HIMIERCOLES', 'HFMIERCOLES', 'HIJUEVES', 'HFJUEVES', 'HIVIERNES', 'HFVIERNES', 'HISABADO', 'HFSABADO','HIDOMINGO', 'HFDOMINGO', 'ACCIONES'];
  dataSource: MatTableDataSource<IServicioFrecuenciaHoraria>;

  id:number;
  public titleTable = "Servicios Horario Clientes";
  public entidadSeleccionado: IServicioFrecuenciaHoraria;
  public elementosTabla = [];
  public router;

  constructor(private _clientesService: ClientesService, public dialog: MatDialog, public _router: Router,private route: ActivatedRoute,private location:Location) {

    this.router = _router;
    this.id = this.route.snapshot.params.id;

    const params = {
      id: this.id,
       }
    this.cargaTabla(params, _clientesService);


  }

  cargaTabla(params,service: ClientesService) {


    service.getAllServiciosClientes(params)
      .subscribe((res: any) => {

        this.elementosTabla = res.data

        this.dataSource = new MatTableDataSource(this.elementosTabla);
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      }, (error: any) => {
        console.log(" on error");
      }, () => {



      })

  }
  applyFilter(event: Event) { // METODO FILTRADO TABLA
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(row) {  // METODO PARA ABRIR EL DIALOG (MODAL)
    this.entidadSeleccionado = row;
    const dialogRef = this.dialog.open(DialogAmpliarInfoComponent, {
      width: '650px',
      height: '500px',
      data: this.entidadSeleccionado
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }


  // NAVIGATES
  irAFormNuevo() {
    this.router.navigate(['/clientes/servicios/nuevo/'+this.id]);
  }
  irAFormModificar(row) {
    this.entidadSeleccionado = row;

    //  const viewEdit= this.viewEdit.cliente
   // this.router.navigate(['/clientes/modificar/'+ this.entidadSeleccionado.id_cliente]);
  }

  volver() {

    this.location.back()
  }

}
