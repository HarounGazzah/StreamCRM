import {AuthService} from '../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/entities/user.model';
import {AppNavbarService} from './app-navbar.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  user$: Observable<User>;
  user;

  constructor(private router: Router, private auth: AuthService,
              private appNavbarService: AppNavbarService) {
  }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      this.auth.getCurrentUser().subscribe(res => {
        this.user = res;
      });

      this.user = JSON.parse(sessionStorage.getItem('user'));
    }

    if (this.auth.isAuthenticated()) {

      this.user$ = this.auth.getCurrentUser();

      this.appNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();

      });

    }
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.isLoggedIn() && this.auth.isAdmin();
  }

  isClient() {

    return this.isLoggedIn() && this.auth.isClient();
  }

  isResource() {
    return this.isLoggedIn() && this.auth.isResource();
  }


  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/auth');

  }

}
