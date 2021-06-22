import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import {  Component, ViewChild} from '@angular/core';
import { ICliente } from '../../../interfaces/ICliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogAmpliarInfoComponent } from './dialogAmpliarInfo.component';
import { DialogUpdateComponent } from '../modificar/dialog-update.component';




@Component({
  templateUrl: 'clientes.component.html',
  styleUrls:['clientes.component.css']
})

export class ClientesComponent   {


  displayedColumns: string[] = ['ID_CLIENTE', 'NOMBRE','DIRECCION', 'TELEFONO', 'ACCIONES'];
  dataSource: MatTableDataSource<ICliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public titleTable = "Clientes";
  public clienteSeleccionado:ICliente;
  public clientes = [];
  public router;

  constructor(private _clientesService: ClientesService, public dialog: MatDialog, public _router: Router) {


    this.router=_router;
    this.cargaTabla( _clientesService);


  }

cargaTabla(service:ClientesService) {
service.getAll()
    .subscribe((res: any) => {

      this.clientes = res.data


    },(error:any) => {
      console.log(" on error");
  },() => {

    this.dataSource = new MatTableDataSource(this.clientes);
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

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
    this.clienteSeleccionado=row;
    const dialogRef = this.dialog.open(DialogAmpliarInfoComponent, {
      width: '650px',
      height: '500px',
      data: this.clienteSeleccionado
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }
  openDialogUpdate(row) {  // METsODO PARA ABRIR EL DIALOG UPDATE ENTIDAD(MODAL)
    this.clienteSeleccionado=row;
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '650px',
      height: '500px',
      data: this.clienteSeleccionado
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }

  irAFormNuevo(){
    this.router.navigate(['/clientes/nuevo']);
  }
  irAFormModificar(row){
    this.clienteSeleccionado=row;

  //  const viewEdit= this.viewEdit.cliente
    this.router.navigate(['/clientes/modificar']);
  }
  irAFormAsignarServicio(){
    this.router.navigate(['/clientes/servicios']);
  }


}
