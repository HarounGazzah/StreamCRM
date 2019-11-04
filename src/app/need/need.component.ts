import {ActivatedRoute, Router} from '@angular/router';
import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'need.component.html',
})
export class NeedComponent {

  editing = false;
  reference: string;


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
    } else {
      this.reference = null;
      this.router.navigate(['/needs/create']);
    }
  }
}
