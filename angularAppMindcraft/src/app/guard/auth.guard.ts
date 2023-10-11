import {ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({providedIn: 'root'})
export class AuthGuard  {
    constructor(private router:Router){
    }

   canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
    // return false;

     if(!this.isAuthenticated() || this.isTokenExpired()){
        this.router.navigate(['login']);
        return false;
    }
    return true;
   }

   isAuthenticated() : boolean {
    const token  = localStorage.getItem("token");
    return token != null || token != undefined;
   }

   isTokenExpired() :boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(localStorage.getItem("token"));
   }
}



