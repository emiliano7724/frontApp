import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    MatTooltipModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),

  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
