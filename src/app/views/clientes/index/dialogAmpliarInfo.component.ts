import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICliente } from '../../../interfaces/ICliente';

@Component({
  selector: 'app-ampliar-dialog',
  templateUrl: './dialogAmpliarInfo.component.html',
  styleUrls:['clientes.component.css']

})
export class DialogAmpliarInfoComponent implements OnInit {


  public titleModal = "Cliente";
  constructor(
    public dialogRef: MatDialogRef<DialogAmpliarInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICliente) {}


  ngOnInit(): void {
  }

}
