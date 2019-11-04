import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent {


  constructor(private router: Router, private toastr: ToastrService,
              activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/admin']);
    }
  }


}
