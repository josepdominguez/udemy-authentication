import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; //we need this interface to use / turn on this class as a guard 
import { Observable } from "rxjs/Rx";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.isAuthenticated().first();
         //means, as soon as you get one value, take it and continue, 
         //because isAuthenticated will be launching more than 1 state
    }
}