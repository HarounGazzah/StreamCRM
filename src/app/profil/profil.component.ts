import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'profil.component.html'
})
export class ProfilComponent {


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {
  }


}
