import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogAmpliarInfoComponent } from './dialogAmpliarInfo.component';
import { IEmpleado } from '../../../interfaces/IEmpleado';



@Component({
  templateUrl: 'empleados.component.html',
  styleUrls: ['empleados.component.css']
})

export class EmpleadosComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['ID_EMPLEADO', 'NOMBRE', 'DIRECCION', 'TELEFONO','ACCIONES'];
  dataSource: MatTableDataSource<IEmpleado>;


  public titleTable = "Empleados";
  public empleadoSeleccionado: IEmpleado;
  public empleados = [];
  public router;

  constructor(private _service: EmpleadosService, public dialog: MatDialog, public _router: Router) {

    this.router = _router;
    this.cargaTabla(_service);


  }

  cargaTabla(service: EmpleadosService) {
    service.getAll()
      .subscribe((res: any) => {

        this.empleados = res.data

        this.dataSource = new MatTableDataSource(this.empleados);
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
    this.empleadoSeleccionado = row;
    const dialogRef = this.dialog.open(DialogAmpliarInfoComponent, {
      width: '650px',
      height: '500px',
      data: this.empleadoSeleccionado
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }



  // NAVIGATES
  irAFormNuevo() {
    this.router.navigate(['/empleados/nuevo']);
  }
  irAFormModificar(row) {
    this.empleadoSeleccionado = row;

    //  const viewEdit= this.viewEdit.empleado
    this.router.navigate(['/empleados/modificar/'+ this.empleadoSeleccionado.id_empleado]);
  }
  irAMesCalendarioServicios(row) {
    this.empleadoSeleccionado = row;
    this.router.navigate(['/empleados/servicios/' + this.empleadoSeleccionado.id_empleado+'/',this.empleadoSeleccionado.nombre]);
  }


}
