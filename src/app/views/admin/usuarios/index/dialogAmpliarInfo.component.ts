import { IUser } from './../../../../interfaces/IUser';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-ampliar-dialog',
  templateUrl: './dialogAmpliarInfo.component.html',
  styleUrls: ['usuarios.component.css']

})
export class DialogAmpliarInfoComponent implements OnInit {


  public titleModal = "Usuario";
  constructor(
    public dialogRef: MatDialogRef<DialogAmpliarInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser) { }


  ngOnInit(): void {
  }

}
