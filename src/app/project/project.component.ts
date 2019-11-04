import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'project.component.html'
})
export class ProjectComponent {

  editing = false;
  reference: string;


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
    } else {
      this.reference = null;
      this.router.navigate(['/projects/create']);
    }
  }

}
