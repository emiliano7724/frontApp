
import { DialogAmpliarInfoComponent } from './index/dialogAmpliarInfo.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './index/empleados.component';
import { EmpleadosNuevoComponent } from './nuevo/empleadosNuevo.component';
import { EmpleadosModificarComponent } from './modificar/empleadosModificar.component';
import { MatFileUploadComponent, MatFileUploadModule } from 'angular-material-fileupload';
import { EmpleadosServiciosComponent } from './servicios/index/empleadosServicios.component';
import { ServicioEmpleadoModificarComponent } from './servicios/modificar/servicioEmpleadoModificar.component';
import { EmpleadoServiciosAsignablesComponent } from './servicios/index_asignables/empleadosServiciosAsignables.component';
import {NgxPrintModule} from 'ngx-print';
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
    NgxPrintModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    EmpleadosComponent,
    EmpleadosNuevoComponent,
    DialogAmpliarInfoComponent,
    EmpleadosModificarComponent,
    EmpleadosServiciosComponent,
    ServicioEmpleadoModificarComponent,
    EmpleadoServiciosAsignablesComponent,
  ],
/*   exports: [
    ClientesComponent
  ] */
})
export class EmpleadosModule { }
