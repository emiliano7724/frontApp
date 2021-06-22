import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './index/clientes.component';
import { ClientesModificarComponent } from './modificar/clientesModificar.component';
import { ClientesNuevoComponent } from './nuevo/clientesNuevo.component';
import { ClientesServiciosComponent } from './servicios/clientesServicios.component';

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
    path: 'modificar',
    component: ClientesModificarComponent,
    data: {
      title: 'Modificar Cliente'
    },
  },

  {
    path: 'servicios',
    component: ClientesServiciosComponent,
    data: {
      title: 'Servicios Cliente'
    },
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
