import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'society.component.html'
})
export class SocietyComponent {

  editing = false;
  societyReference: string;


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.societyReference = activeRoute.snapshot.params['reference'];
    } else {
      this.societyReference = null;
      this.router.navigate(['/societies/create']);
    }
  }


}
