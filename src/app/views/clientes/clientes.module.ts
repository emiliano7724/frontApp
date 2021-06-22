import { DialogAmpliarInfoComponent } from './index/dialogAmpliarInfo.component';
import { ClientesNuevoComponent } from './nuevo/clientesNuevo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ClientesComponent } from './index/clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogMensajeComponent } from '../mensajeDialog/mensajeDialog.component';
import { ClientesModificarComponent } from './modificar/clientesModificar.component';
import { ClientesServiciosComponent } from './servicios/clientesServicios.component';
import { DialogUpdateComponent } from './modificar/dialog-update.component';
@NgModule({
  imports: [
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ClientesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    ClientesComponent,
    ClientesNuevoComponent,
    DialogAmpliarInfoComponent,
    DialogMensajeComponent,
    DialogUpdateComponent,
    ClientesModificarComponent,
    ClientesServiciosComponent],
/*   exports: [
    ClientesComponent
  ] */
})
export class ClientesModule { }
