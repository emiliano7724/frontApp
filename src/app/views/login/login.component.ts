import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { analyzeFile } from '@angular/compiler';




@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
 // styleUrls: ['login.component.css']
})
export class LoginComponent {

  formInvalido: boolean;

  constructor(public fb: FormBuilder, private loginService:LoginService, private authService: AuthService, public router: Router) {
   }

  formLogin = this.fb.group({
    name:["administrador", Validators.required],
    password:["1234", Validators.required]
  });

  doLogin(){
    if(this.formLogin.valid){
      this.loginService.login(this.formLogin.value)
      .subscribe((resp: any) => {

        if (resp.estado==="invalidLogin") {
          this.formInvalido=true;

        } else {
          localStorage.setItem("token", resp.token);
          this.authService.authenticate()
          this.router.navigate(['/dashboard'])
        }


        //  console.log("estado auth", this.authService.authState)

      })
    }
    else{
    this.formInvalido=true;
    }
  }

  validaRequiredUserField() {
    if (this.formLogin.get('name').hasError('required')) {
      return 'Ingrese su nombre de usuario';
    }
    }

    validaRequiredPasswordField() {
      if (this.formLogin.get('password').hasError('required')) {
        return 'Ingrese su contraseña';
      }
      }


  muestraMensaje(){
    if (this.formInvalido) {
      return "Usuario o contraseña incorrecta";

    }
  }


}
