import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/IUser';
import { AuthService } from '../../services/auth.service';
import { MiCuentaService } from './micuenta.service';

@Component({
  templateUrl: 'micuenta.component.html'
})

export class MiCuentaComponent  {

  public router;
  public entidad : IUser;

  titleSingular: string="Cuenta de usuario"

  constructor(public authService: AuthService,public fb: FormBuilder,public fbPassword: FormBuilder,private _service: MiCuentaService, public _router: Router) {
  /*   this.entidad.nombre=""; // inciia nombre empresa
    this.entidad.rol=""; */

    this.router = _router;


    this.getUser();
  }
  fileName=""
  file:any

  private validar(event:any):Boolean{
    const maxSize = 500000;
    this.file = event.target.files
    this.fileName = event.target.files[0].name

    if(this.file.length < 0){
      console.log("No se adjunto ningun archivo")
      this.file = "";
      this.fileName = "Error en validacion"
      return false
    }

    if(this.file[0].size > maxSize){
      console.log("ha superado el tamaño permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }
   //this.file[0].type != 'image/jpeg'||
    if(this.file[0].type != 'image/png'){
      console.log("El formato no es el permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }

    return true

  }

  onFileChange(event:any){

    const validacion = this.validar(event)

    if(validacion){
      let file = new FormData()
      file.append('imag', this.file[0], this.fileName);

      this._service.sendFile(file).subscribe(resp=>{
        console.log(resp)
      })
    }

  }

  public formModificaEntidad = this.fb.group({
    name: ["", [Validators.required, Validators.maxLength(150)]],
    telefono: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    razon_social: ["", [Validators.required]],
    nombre_rol: ["", [Validators.required]],


  })

  public formModificaPassword = this.fbPassword.group({
    passwordActual: ["", [Validators.required]],
    passwordNuevo: ["", Validators.required],
    passwordNuevoRepetido: ["", Validators.required],

  })
  getUser() {
    this.authService.getUser().subscribe((res: any) => {

      this.entidad=res.data;

      this.formModificaEntidad.get('name')?.setValue(this.entidad.name);
      this.formModificaEntidad.get('telefono')?.setValue(this.entidad.telefono);
      this.formModificaEntidad.get('email')?.setValue(this.entidad.email)
      this.formModificaEntidad.get('razon_social')?.setValue(this.entidad.razon_social)
      this.formModificaEntidad.get('nombre_rol')?.setValue(this.entidad.nombre_rol)

    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })
  }


  updateDataDialog() {

    if (this.formModificaEntidad.valid) {


      Swal.fire({
        title: 'Seguro de realizar cambios en ' + this.titleSingular + '?',
        text: 'Si confirma se modificará el  ' + this.titleSingular + ' en la base de datos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.updateEntidad(this._service);

        }

      })
    } else {

      Swal.fire(
        'Error de validación de formulario',
        "Error: Verifique los errores y requerimientos resaltados en el formulario",
        'error'
      )
    }
  }
  updateEntidad(_service: MiCuentaService) {

    const id={
      id_user:this.entidad.id_user
    }
    const params={
    ...this.formModificaEntidad.value,
    ...id
    }

    _service.updateMisdatosUsuario(params).subscribe((res: any) => {
      if (res.estado === "error") {
        //    console.log(res.data.sqlMessage)
        const mensajeError = res.data.code + " " + res.data.errno
        Swal.fire(
          'Ocurrió un error, consulte con el administrador del sistema',
          "Error: " + mensajeError,
          'error'
        )
      } else {
        Swal.fire(
          'Operación exitosa!',
          'Cambios realizados correctamente en ' + this.titleSingular,
          'success'
        )
      }

    })
  }
  updatePasswordDialog() {

    if (this.formModificaPassword.valid) {

if(this.formModificaPassword.controls['passwordNuevo'].value===this.formModificaPassword.controls['passwordNuevoRepetido'].value){
  Swal.fire({
    title: 'Seguro de cambiar su contraseña?',
    text: 'Si confirma se modificará el la clave de acceso para ingresar al sistema',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      this.updatePassword(this._service,this.authService);

    }

  })
}else{
  Swal.fire(
    'Error de validacion contraseñas',
    "Error: NO coinciden la contraseña nueva y su reingreso",
    'error'
  )
}


    } else {

      Swal.fire(
        'Error de validación de formulario',
        "Error: Verifique los errores y requerimientos resaltados en el formulario",
        'error'
      )
    }
  }
  updatePassword(_service: MiCuentaService, _authService: AuthService) {


    _service.updatePassword(this.formModificaPassword.value).subscribe((res: any) => {
      if (res.estado === "error") {
        //    console.log(res.data.sqlMessage)
        const mensajeError = res.data.code + " " + res.data.errno
        Swal.fire(
          'Ocurrió un error, consulte con el administrador del sistema',
          "Error: " + res.mensaje,
          'error'
        )
      } else {
        _authService.logout();
          this.router.navigate(['/login'])
        Swal.fire(
          'Operación exitosa!',
          'Cambios realizados correctamente en ' + this.titleSingular+ ' vuelva a loguerse con sus nuevas credenciales',
          'success'
        )


      }

    })
  }

  validaRequiredField() {
    if (
      this.formModificaEntidad.get('name').hasError('required')
      || this.formModificaEntidad.get('telefono').hasError('required')
      || this.formModificaEntidad.get('email').hasError('required')
      || this.formModificaPassword.get('passwordActual').hasError('required')
      || this.formModificaPassword.get('passwordNuevo').hasError('required')
      || this.formModificaPassword.get('passwordNuevoRepetido').hasError('required')



    ) {
      return 'Campo Obligatorio';
    }


  }
  validaEmail() {
    if (this.formModificaEntidad.get('email').hasError('required')) {
      return 'Campo Obligatorio';
    }

    return this.formModificaEntidad.get('email').hasError('email') ? 'E-Mail Inválido' : '';
  }

}


