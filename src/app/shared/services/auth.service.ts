import {User} from '../entities/user.model';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {JwtToken} from '../entities/token.model';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.userService.authenticate(username, password);
  }

  getCurrentUser(): Observable<User> {

    return this.userService.getCurrentUser();

  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();

    // return a boolean reflecting
    // whether or not the token is expired
    if (token == null || token === 'undefined') {
      return false;
    }

    if (!this.tokenNotExpired()) {
      this.clear();
      return false;
    }

    return true;

  }

  public isCurrentUser(userName: string): boolean {

    return this.getJwtToken().sub === userName;
  }


  public isAdmin(): boolean {
    return this.isAuthenticated() && this.roleMatch(['ROLE_ADMIN']);
  }
  public isResource(): boolean {
    return  this.isAuthenticated() && this.roleMatch(['ROLE_RESOURCE']);
  }
  public isClient(): boolean {
    return  this.isAuthenticated() && this.roleMatch(['ROLE_CLIENT']);
  }




  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: string[] = this.getJwtToken().auth;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;

        return false;
      }
    }
    );
    return isMatch;

  }


  clear() {
    this.userService.logout();
  }

  private tokenNotExpired(): boolean {

    let decodedJwtData = this.getJwtToken();

    // console.log('decodedJwtData: ' + decodedJwtData);
    // console.log('exp: ' + decodedJwtData.exp);
    //
    // console.log('date: ' + new Date().getTime());

    // console.log('User Name: ' + decodedJwtData.sub);


    return (decodedJwtData.exp > new Date().getTime());
  }

  private getJwtToken(): JwtToken {
    let decodedJwtJsonData = window.atob(this.getToken().split('.')[1]);
    let decodedJwtData = JSON.parse(decodedJwtJsonData) as JwtToken;

    decodedJwtData.exp = decodedJwtData.exp * 1000;
    decodedJwtData.iat = decodedJwtData.iat * 1000;

    return decodedJwtData;
  }

}
