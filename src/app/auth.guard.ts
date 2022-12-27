import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }
  
  canActivate(): boolean{
    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
