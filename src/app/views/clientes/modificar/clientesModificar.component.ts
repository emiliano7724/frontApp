import { ICliente } from './../../../interfaces/ICliente';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajeComponent } from '../../clientes/mensajeDialog/mensajeDialog.component';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: 'clientesModificar.component.html',
  styleUrls: ['clientesModificar.component.css']

})
export class ClientesModificarComponent {
  id: number;
  router: Router;
  checked: boolean;

  getIdUserLogueado(): number {
    return 1;
  }


  public titleSingular = "Cliente"
  public entidad: ICliente;


  constructor(public fb: FormBuilder,
    public _router: Router,
    private _clientesService: ClientesService,
    public dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.router = _router;

    this.id = this.route.snapshot.params.id;

    const params = {
      id: this.id
    }
    this.getEntidadById(params, _clientesService);

  }


  formModificaEntidad = this.fb.group({
    nombre: ["", [Validators.required, Validators.maxLength(150)]],
    telefono: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    id_localidad: ["", [Validators.required]],
    direccion: ["", [Validators.required]],
    id_categoria_iva: ["", [Validators.required]],
    cuit: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
    id_user: [this.getIdUserLogueado()],
    id_cliente: [""],
    estado: [""]
  })


  getEntidadById(params, service: ClientesService) {

    service.getById(params)
      .subscribe((res: any) => {

        this.entidad = res.data;
        if (this.entidad.deleted_at_cli) {
          this.entidad.estado = false;
          this.checked=false
        } else {
          this.entidad.estado = true;
          this.checked=true
        }
        console.log(this.entidad)
        this.formModificaEntidad = this.fb.group({

          nombre: [this.entidad.nombre, [Validators.required, Validators.maxLength(150)]],
          telefono: [this.entidad.telefono, Validators.required],
          email: [this.entidad.email, [Validators.required, Validators.email]],
          id_localidad: [String(this.entidad.id_localidad), [Validators.required]],
          direccion: [this.entidad.direccion, [Validators.required]],
          id_categoria_iva: [String(this.entidad.id_categoria_iva), [Validators.required]],
          cuit: [this.entidad.cuit, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20)]],
          id_user: [this.getIdUserLogueado()],
          id_cliente: [this.entidad.id_cliente],
          estado: [this.entidad.estado]
        })

      }, (_error: any) => {
        console.log(" on error");
      }, () => {

        //console.log(this.entidad)

      })



  }

  validaEmail() {
    if (this.formModificaEntidad.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formModificaEntidad.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }
  validaRequiredField() {
    if (
      this.formModificaEntidad.get('nombre').hasError('required')
      || this.formModificaEntidad.get('telefono').hasError('required')
      || this.formModificaEntidad.get('cuit').hasError('required')
      || this.formModificaEntidad.get('direccion').hasError('required')


    ) {
      return 'Campo Obligatorio';
    }


  }
  registro() {

    if (this.formModificaEntidad.valid) {
      this.updateEntidad(this._clientesService);

    } else {

      this.openDialog("Complete correctamente el formulario")
    }
  }


  updateEntidad(_clientesService: ClientesService) {

    console.log(this.formModificaEntidad.value);
    _clientesService.update(this.formModificaEntidad.value).subscribe((res: any) => {
      //console.log(res)
      /*  if (res.estado == "error") {
         //    console.log(res.data.sqlMessage)
         this.openDialog(res)
       } else {

         this.openDialog(res)

       } */
      this.openDialog(res);

    })
  }

  volver() {
    this.router.navigate(['/clientes']);
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

}




