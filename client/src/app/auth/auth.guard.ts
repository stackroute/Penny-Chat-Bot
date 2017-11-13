import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*Checking without login cannot go to any link through URL*/
    let data = JSON.parse(localStorage.getItem('Userdata'));
    if(data!=null)
    {
      if(data.status==true)
      {
        return true;
      }
    }
    //If not login redirect to login page
    this.router.navigateByUrl('/');
    return false;
  }
}