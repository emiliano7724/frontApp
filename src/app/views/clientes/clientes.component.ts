import { ClientesService } from './clientes.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ICliente } from '../../interfaces/clientesInterface';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from './sortable.directive';



@Component({
  templateUrl: 'clientes.component.html',

})

export class ClientesComponent implements OnInit {
  clientes$: Observable<ICliente[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public titleTable = "Clientes";

  public clientes = [];

  constructor(private _clientesService: ClientesService) {
    this.clientes$ = _clientesService._clientes$;
    this.total$ = _clientesService._total$;
  }


  ngOnInit() {

    this._clientesService.getClientes()
      .subscribe((res: any) => {

        this.clientes = res.data
console.log( this.clientes)
      })



  }


}
