import {AuthService} from '../shared/services/auth.service';
import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/auth');
      return false;
    }

    const roles = route.data['roles'] as Array<string>;

    if (roles) {
      const match = this.auth.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/developers', 'forbidden']);
        return false;
      }
    }

    return true;
  }

}

@Injectable()
export class LoginGuard {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {




    if (this.auth.isAuthenticated() ) {
      if (this.auth.isResource()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/developers']);
      return false;
      }
      } return true;

  }

}




