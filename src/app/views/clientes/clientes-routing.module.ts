import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './index/clientes.component';
import { ClientesModificarComponent } from './modificar/clientesModificar.component';
import { ClientesNuevoComponent } from './nuevo/clientesNuevo.component';
import { ClientesServiciosComponent } from './servicios/index/serviciosclientes.component';
import { ClientesNuevoServiciosComponent } from './servicios/nuevo/clientesServicios.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    data: {
      title: 'Clientes'
    },
  },
  {
    path: 'nuevo',
    component: ClientesNuevoComponent,
    data: {
      title: 'Nuevo Cliente'
    },
  },
  {
    path: 'modificar/:id',
    component: ClientesModificarComponent,
    data: {
      title: 'Modificar Cliente'
    },
  },

  {
    path: 'servicios/:id',
    component: ClientesServiciosComponent,
    data: {
      title: 'Servicios Cliente'
    },
  },
  {
    path: 'servicios/nuevo/:id',
    component: ClientesNuevoServiciosComponent,
    data: {
      title: 'Nuevo Servicio Cliente'
    },
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
