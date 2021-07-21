import { ServiciosService } from './views/servicios/servicios.service';
import { UsuariosModule } from './views/admin/usuarios/usuarios.module';
import { UsuariosService } from './views/admin/usuarios/usuarios.service';
import { AuthGuard } from './guards/auth.guards';
import { MiCuentaService } from './views/micuenta/micuenta.service';
import { MiCuentaModule } from './views/micuenta/micuenta.module';
import { ClientesService } from './views/clientes/clientes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './services/tokenInterceptor.service';
import { EmpleadosService } from './views/empleados/empleados.service';

import { LoginService } from './views/login/login.service';
import { LoginModule } from './views/login/login.module';
import { DashboardService } from './views/dashboard/dashboard.service';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),

    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    NgbModule,
    LoginModule,
    NgxPrintModule




  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,

    RegisterComponent,





  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},

    {

      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuard,
    IconSetService,
    ClientesService,
    EmpleadosService,
    LoginService,
    DashboardService,
    MiCuentaService,
    UsuariosService,
    ServiciosService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
