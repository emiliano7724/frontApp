import { DialogMensajeComponent } from '../mensajeDialog/mensajeDialog.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { MatFileUploadComponent } from 'angular-material-fileupload';


@Component({
  templateUrl: 'empleadosNuevo.component.html',
  styleUrls: ['empleadosNuevo.component.css']

})

export class EmpleadosNuevoComponent implements OnInit {
  getIdUserLogueado(): Number {
    return 1;
  }

  public router:Router;
  public titleSingular = "Empleado";
  constructor(public fb: FormBuilder, public _router: Router, private _service: EmpleadosService, public dialog: MatDialog,) {

    this.router = _router;

  }

  storeEntidad(_service: EmpleadosService) {
console.log(this.formNuevaEntidad.value)
    _service.store(this.formNuevaEntidad.value).subscribe((res: any) => {

      if (res.estado == "error") {
    //    console.log(res.data.sqlMessage)
        this.openDialog(res)
      } else {
        this.openDialog(res)
      }

    })
  }

  openDialog(data) {  // METODO PARA ABRIR EL DIALOG (MODAL)
//console.log(data)
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      width: '500px',
      height: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  formNuevaEntidad = this.fb.group({
    nombre: ["empleadoDesdeForm", [Validators.required, Validators.maxLength(150)]],
    telefono: ["45654521DesdeForm", Validators.required],
    email: ["emilianoDesdeForm@gmail.com", [Validators.required, Validators.email]],
    id_localidad: ["1", [Validators.required]],
    direccion: ["25 de mayo DesdeForm", [Validators.required]],
    id_tipo_empleado: ["2", [Validators.required]],
    cuit: ["20339626724", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    dni: [33962672, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    precio_hora: [350, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    foto: ["assets/img/avatars/4.jpg", [Validators.required, Validators.maxLength(150)]],
    id_user: [this.getIdUserLogueado()]

  })

  registro() {

    if (this.formNuevaEntidad.valid) {
      this.storeEntidad(this._service);

    } else {
    //this.openDialog("Complete correctamente el formulario")
    }
  }
s
 validaEmail() {
    if (this.formNuevaEntidad.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formNuevaEntidad.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formNuevaEntidad.get('nombre').hasError('required')
      || this.formNuevaEntidad.get('telefono').hasError('required')
      || this.formNuevaEntidad.get('cuit').hasError('required')
      || this.formNuevaEntidad.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }


  ngOnInit(): void {
  }
  volver() {
    this.router.navigate(['/empleados']);
  }



}
