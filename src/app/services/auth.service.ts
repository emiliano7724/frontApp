import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authState = new BehaviorSubject(false);

  authenticate(){
    this.authState.next(true);
  };

  isAuthenticate(){
    return this.authState.value
  }

  logoaut(){
    localStorage.removeItem("token");
    this.authState.next(false);
  }


}
