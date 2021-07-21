import { IUser } from './../../interfaces/IUser';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../services/auth.service';
import {
  navItems
} from '../../_nav';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent  {
  public  user: IUser;
  imagen: any;
  imagenURL: any;
  constructor(private dom:DomSanitizer,public authService: AuthService, public service: AuthService, private router: Router) {
    this.getUser();

  }



  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  salir() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }


  getUser() {
    this.authService.getUser().subscribe((res: any) => {

      this.user=res.data;
      this.cargarFotoDesdeServer( this.authService,this.user);
    }, (error: any) => {
      console.log(" on error");
    }, () => {



    })
  }
  cargarFotoDesdeServer(authService: AuthService,user:IUser) {
    authService.getImgUser(user).subscribe((res: any) => {

     // this.imagen=res.data;
      console.log(res)
      //this.imagenURL=this.dom.bypassSecurityTrustResourceUrl(this.imagen)
    },(res:any) => {

      console.log(res)

    })
  }


}
