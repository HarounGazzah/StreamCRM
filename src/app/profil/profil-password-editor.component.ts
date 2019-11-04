import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../shared/services/user.service';
import {Password} from '../shared/entities/password.model';

@Component({
  moduleId: module.id,
  templateUrl: 'profil-password-editor.component.html'
})
export class ProfilPasswordEditorComponent {

  password: Password = new Password();

  constructor(private toastr: ToastrService,
              private router: Router,
              private service: UserService,
              private activeRoute: ActivatedRoute) {
  }


  save(form: NgForm) {

    if (form.valid) {

      this.service.changePassword(this.password.oldPassword, this.password.newPassword)
        .subscribe(
          response => {
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          }
        );

    }

  }
}
