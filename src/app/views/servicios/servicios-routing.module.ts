import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './index/servicios.component';



const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    data: {
      title: 'Servicios'
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
