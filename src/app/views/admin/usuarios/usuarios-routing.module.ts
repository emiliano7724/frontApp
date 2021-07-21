import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './index/usuarios.component';

import {  UsuariosModificarComponent } from './modificar/usuariosModificar.component';
import { UsuariosNuevoComponent } from './nuevo/usuariosNuevo.component';


const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    },
  },
  {
    path: 'nuevo',
    component:  UsuariosNuevoComponent,
    data: {
      title: 'Nuevo Usuario'
    },
  },
  {
    path: 'modificar/:id',
    component:  UsuariosModificarComponent,
    data: {
      title: 'Modificar Usuario'
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
