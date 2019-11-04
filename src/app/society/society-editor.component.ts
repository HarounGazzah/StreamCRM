import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Society} from '../shared/entities/society.model';
import {SocietyService} from '../shared/services/society.service';

@Component({
  moduleId: module.id,
  templateUrl: 'society-editor.component.html'
})
export class SocietyEditorComponent {

  editing = false;
  society: Society = new Society();
  serviceTitle = '';
  users: User[];
  stages: any[];


  constructor(private service: SocietyService, private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['reference'] !== undefined;

    userService.getUsers().subscribe(response => this.users = response);

    if (this.editing) {
      service.getSociety(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.society = response
          , error =>
            this.router.navigate(['/societies', 'error']));
    }

    this.stages = [
      {label: 'Non défini', value: ''},
      {label: 'Prospect', value: 'Prospect'},
      {label: 'Client', value: 'Customer'},
      {label: 'Partenaire', value: 'Partner'},
      {label: 'Fournisseur', value: 'Provider'},
      {label: 'Archivé', value: 'Archive'}];

  }

  addService() {
    if (this.society.services == undefined) {
      this.society.services = [];
    }
    this.society.services.push(this.serviceTitle);
    this.serviceTitle = '';
  }

  removeService(i: number) {
    this.society.services.splice(i, 1);
  }


  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateSociety(this.society, this.society.reference)
          .subscribe(
            response => {

              this.society = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createSociety(this.society)
          .subscribe(response => {

            this.toastr.success('Societé Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/societies/edit', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création de la Societé', 'Opération échoué !!!');
          });
      }
    }
  }
}
