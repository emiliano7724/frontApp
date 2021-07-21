import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MiCuentaComponent } from './micuenta.component';
import { MiCuentaRoutingModule } from './micuenta-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_ICON_LOCATION, MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [


    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MiCuentaRoutingModule,
    MatTooltipModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule

  ],
  declarations: [ MiCuentaComponent ]
})
export class MiCuentaModule { }
