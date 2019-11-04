import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DeveloperService} from '../shared/services/developer.service';
import {Developer} from '../shared/entities/developer.model';

@Component({
  moduleId: module.id,
  templateUrl: 'developer.component.html',
  styleUrls: ['developer.component.css']

})
export class DeveloperComponent {

  editing = false;
  reference: string;
  developer: Developer;

  constructor(private router: Router,
              activeRoute: ActivatedRoute,
              private developerService: DeveloperService) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
      this.developerService.getDeveloper(this.reference).subscribe(res => {
        this.developer = res;
      })
    } else {
      this.reference = null;
      this.router.navigate(['/' + activeRoute.snapshot.url[0].toString() + '/create']);
    }
  }


}
