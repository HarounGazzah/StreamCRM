import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SocietyContact} from '../shared/entities/society-contact.model';
import {SocietyContactService} from '../shared/services/society-contact.service';

@Component({
  moduleId: module.id,
  templateUrl: 'society-contact-editor.component.html'
})
export class SocietyContactEditorComponent {

  editing = false;
  societyContact: SocietyContact = new SocietyContact();
  societyReference: string;
  users: User[];
  stages: any[];


  constructor(private service: SocietyContactService, private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['societyContactReference'] !== undefined;

    if (this.editing) {
      this.societyReference = activeRoute.snapshot.parent.parent.params['reference'];
    } else {
      this.societyReference = activeRoute.snapshot.parent.params['reference'];
    }

    userService.getUsers().subscribe(response => this.users = response);

    if (this.editing) {
      service.getSocietyContact(activeRoute.snapshot.parent.params['societyContactReference'], this.societyReference)
        .subscribe(response => this.societyContact = response
          , error =>
            this.router.navigate(['/societies/' + this.societyReference + '/contacts', 'error']));
    }

    this.stages = [
      {label: 'Non défini', value: ''},
      {label: 'Prospect', value: 'Prospect'},
      {label: 'Client', value: 'Customer'},
      {label: 'Partenaire', value: 'Partner'},
      {label: 'Fournisseur', value: 'Provider'},
      {label: 'Archivé', value: 'Archive'}];

  }


  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateSocietyContact(this.societyContact, this.societyContact.reference, this.societyReference)
          .subscribe(
            response => {

              this.societyContact = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createSocietyContacts(this.societyContact, this.societyReference)
          .subscribe(response => {

            this.toastr.success('Contact Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création du Contact', 'Opération échoué !!!');
          });
      }
    }
  }
}
