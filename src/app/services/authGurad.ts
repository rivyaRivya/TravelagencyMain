import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) {
  }
  loginData: any;
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.loginData = localStorage.getItem("loginData");
    this.loginData = JSON.parse(this.loginData);
    if (this.loginData.email != "admin")
      this._router.navigate(["home"]);
    return true;
  }
}
