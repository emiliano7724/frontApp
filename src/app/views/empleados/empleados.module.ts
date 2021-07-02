import { DialogAmpliarInfoComponent } from './index/dialogAmpliarInfo.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

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
//import { DialogMensajeComponent } from '../mensajeDialog/mensajeDialog.component';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './index/empleados.component';
import { EmpleadosNuevoComponent } from './nuevo/empleadosNuevo.component';
import { EmpleadosModificarComponent } from './modificar/empleadosModificar.component';
import { MatFileUploadComponent, MatFileUploadModule } from 'angular-material-fileupload';
import { DialogMensajeComponent } from './mensajeDialog/mensajeDialog.component';
import { EmpleadosServiciosComponent } from './servicios/index/empleadosServicios.component';
import { ServicioEmpleadoModificarComponent } from './servicios/modificar/servicioEmpleadoModificar.component';

@NgModule({
  imports: [

    MatFileUploadModule,
    MatCheckboxModule,
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
    EmpleadosRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    EmpleadosComponent,
    EmpleadosNuevoComponent,
    DialogAmpliarInfoComponent,
    EmpleadosModificarComponent,
    DialogMensajeComponent,
    EmpleadosServiciosComponent,
    ServicioEmpleadoModificarComponent
  ],
/*   exports: [
    ClientesComponent
  ] */
})
export class EmpleadosModule { }
