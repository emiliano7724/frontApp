import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts'

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];



  public router;
  public empleadosActivos : Number;
  public empleadosActivosSinServicios=[];
  public clientesActivos : Number;
  public clientesActivosSinServicios=[];
  constructor(private _service: DashboardService, public _router: Router) {

    this.router = _router;
    this.cargarDashboard(_service);


  }
  cargarDashboard(service: DashboardService) {

        this.getEmpleadosActivos(service);
        this.getEmpleadosActivosSinServicios(service);
        this.getClientesActivos(service);
        this.getClientesActivosSinServicios(service);
  }
  getEmpleadosActivos(service: DashboardService) {
    service.getEmpleadosActivos()
    .subscribe((res: any) => {

      this.empleadosActivos = res.data

    //  console.log(this.empleadosActivos)

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })

  }
  getEmpleadosActivosSinServicios(service: DashboardService) {
    service.getEmpleadosActivosSinServicios()
    .subscribe((res: any) => {

      this.empleadosActivosSinServicios = res.data

    // console.log(this.empleadosActivosSinServicios.length)

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })

  }
  getClientesActivos(service: DashboardService) {
    service.getClientesActivos()
    .subscribe((res: any) => {

      this.clientesActivos = res.data

    //  console.log(this.empleadosActivos)

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })

  }

  getClientesActivosSinServicios(service: DashboardService) {
    service.getClientesActivosSinServicios()
    .subscribe((res: any) => {

      this.clientesActivosSinServicios = res.data

     //console.log(this.clientesActivosSinServicios.length)

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })

  }



  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
    // generate random values for mainChart

  }
}


