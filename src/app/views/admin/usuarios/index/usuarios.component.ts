import { Router } from '@angular/router';

import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../../../interfaces/IUser';
import { UsuariosService } from '../usuarios.service';



@Component({
  templateUrl: 'usuarios.component.html',
  styleUrls: ['usuarios.component.css']
})

export class UsuariosComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['ID_USER', 'NOMBRE', 'EMAIL', 'TELEFONO', 'EMPRESA', 'ROL', 'ACCIONES'];
  dataSource: MatTableDataSource<IUser>;


  public titleTable = "Usuarios";
  public usuarioseleccionado: IUser;
  public usuarios = [];
  public router;

  constructor(private _usuariosService: UsuariosService, public dialog: MatDialog, public _router: Router) {

    this.router = _router;
    this.cargaTabla(_usuariosService);


  }

  cargaTabla(service: UsuariosService) {
    service.getAll()
      .subscribe((res: any) => {

        this.usuarios = res.data

        this.dataSource = new MatTableDataSource(this.usuarios);
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



  // NAVIGATES
  irAFormNuevo() {
    this.router.navigate(['admin/usuarios/nuevo']);
  }
  irAFormModificar(row) {
    this.usuarioseleccionado = row;

    //  const viewEdit= this.viewEdit.cliente
    this.router.navigate(['admin/usuarios/modificar/'+ this.usuarioseleccionado.id_user]);
  }

}
