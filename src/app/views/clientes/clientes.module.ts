import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ClientesRoutingModule,
    ChartsModule,
    BsDropdownModule,

    ButtonsModule.forRoot()
  ],
  declarations: [ ClientesComponent ]
})
export class ClientesModule { }
