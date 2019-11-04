import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';
import {ValidatorService} from './shared/services/validator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  display = true;

  constructor(private router: Router, private auth: AuthService, private validator: ValidatorService) {
    if (this.auth.isResource() ) {
      this.display = false;
    }
  }
}
