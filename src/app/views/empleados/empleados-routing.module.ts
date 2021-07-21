import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './index/empleados.component';
import { EmpleadosModificarComponent } from './modificar/empleadosModificar.component';
import { EmpleadosNuevoComponent } from './nuevo/empleadosNuevo.component';
import { EmpleadosServiciosComponent } from './servicios/index/empleadosServicios.component';
import { EmpleadoServiciosAsignablesComponent } from './servicios/index_asignables/empleadosServiciosAsignables.component';
import { ServicioEmpleadoModificarComponent } from './servicios/modificar/servicioEmpleadoModificar.component';



const routes: Routes = [
  {
    path: '',
    component: EmpleadosComponent,
    data: {
      title: 'Empleados'
    },
  },
  {
    path: 'nuevo',
    component: EmpleadosNuevoComponent,
    data: {
      title: 'Nuevo Empleado'
    },
  },
  {
    path: 'modificar/:id',
    component: EmpleadosModificarComponent,
    data: {
      title: 'Modificar Empleado'
    },

  },
  {
    path: 'servicios/asignables/:id/:nombre',
    component: EmpleadoServiciosAsignablesComponent,
    data: {
      title: 'Ver Servicios Asignables - Empleado'
    },

  },

  {
    path: 'servicios/:id/:nombre',
    component: EmpleadosServiciosComponent,
    data: {
      title: 'Servicios del Empleado'
    },

  },
  {
    path: 'modificarServicio/:id/:semana/:nombre',
    component: ServicioEmpleadoModificarComponent,
    data: {
      title: 'Modificar Servicio del Empleado'
    },

  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
