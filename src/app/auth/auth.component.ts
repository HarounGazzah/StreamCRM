import {AuthService} from '../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidatorService} from '../shared/services/validator.service';
import {DeveloperService} from '../shared/services/developer.service';

@Component({
  moduleId: module.id,
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{

  username: string;
  password: string;

  errorMessage: string;
  errorFields: string [];


  constructor(private router: Router, private auth: AuthService, private validator: ValidatorService,
              private devService: DeveloperService) {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      sessionStorage.setItem('username', this.username);
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          this.devService.getDeveloperByEmail(this.username).subscribe(res => {
            sessionStorage['ref'] = res.reference;
            sessionStorage['user'] = JSON.stringify(res);
          });
          if (response) {
            if (this.auth.isAdmin()) {
               this.router.navigate(['/stats']);
            } else if (this.auth.isResource())  { this.router.navigate(['/dashboard']);
              } else {
              this.router.navigate(['/developers']);
            }

          }
          this.errorMessage = 'Erreur d\'authentification';
        }, err => {
          this.errorMessage = 'Erreur d\'authentification';
        });
    } else {
      this.errorMessage = 'Données du formulaire invalide';
      this.errorFields = this.validator.getFormValidationMessages(form);
    }
  }


  logOut() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
