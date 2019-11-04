import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'society-contact.component.html'
})
export class SocietyContactComponent {

  editing = false;


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (!this.editing) {
      this.router.navigate(['/societies/' + activeRoute.snapshot.params['reference'] + '/contacts', 'error']);
    }


  }


}
