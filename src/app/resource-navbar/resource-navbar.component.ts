import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../shared/entities/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {ResourceNavbarService} from './rousource-navbar.service';

@Component({
  selector: 'app-resource-navbar',
  templateUrl: './resource-navbar.component.html',
  styleUrls: ['./resource-navbar.component.css']
})
export class ResourceNavbarComponent implements OnInit {

  user$: Observable<User>;

  constructor(private router: Router, private auth: AuthService,
              private resourceNavbarService: ResourceNavbarService) {
  }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {

      this.user$ = this.auth.getCurrentUser();

      this.resourceNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();

      });

    }

  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }


  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/auth');

  }


}
