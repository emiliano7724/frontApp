import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './mensajeDialog.component.html',
  styleUrls:['mensajeDialog.component.css']

})
export class DialogMensajeComponent implements OnInit {


  public titleModal = "Mensaje";
  constructor(
    public dialogRef: MatDialogRef<DialogMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}


  ngOnInit(): void {
  }

}
