import { IEmpleado } from './../../../interfaces/IEmpleado';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-ampliar-dialog',
  templateUrl: './dialogAmpliarInfo.component.html',
  styleUrls: ['empleados.component.css']

})
export class DialogAmpliarInfoComponent implements OnInit {


  public titleModal = "Empleado";
  constructor(
    public dialogRef: MatDialogRef<DialogAmpliarInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmpleado) { }


  ngOnInit(): void {
  }

}
