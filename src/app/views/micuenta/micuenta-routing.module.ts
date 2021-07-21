import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiCuentaComponent } from './micuenta.component';



const routes: Routes = [
  {
    path: '',
    component: MiCuentaComponent,
    data: {
      title: 'Mi Cuenta de usuario'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiCuentaRoutingModule {}
