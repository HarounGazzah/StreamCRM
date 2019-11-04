import {Action} from '../shared/entities/action.model';
import {ActionService} from '../shared/services/action.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SocietyContact} from '../shared/entities/society-contact.model';
import {SocietyContactService} from '../shared/services/society-contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  moduleId: module.id,
  templateUrl: 'action-editor.component.html'
})
export class ActionEditorComponent {

  editing = false;
  action: Action = new Action();
  reference: string;
  dateNow = new Date();

  contacts: SocietyContact[];


  types: any[];

  contactType = '';
  societyReference = '';


  actions: Action[];


  constructor(private service: ActionService,
              private societyContactService: SocietyContactService,
              private router: Router,
              private toastr: ToastrService,
              activeRoute: ActivatedRoute) {

    this.contactType = activeRoute.snapshot.parent.url[0].toString();

    if (this.isDeveloper() || this.isResource()) {
      this.reference = activeRoute.snapshot.parent.params['reference'];
      this.service.getActions(this.reference)
        .subscribe(response => this.actions = response,
          error =>
            this.router.navigate(['/' + activeRoute.snapshot.parent.url[0].toString(), 'error']));
    } else if (this.isSocietyContact()) {
      this.reference = activeRoute.snapshot.parent.params['societyContactReference'];
      this.societyReference = activeRoute.snapshot.parent.parent.params['reference'];
      this.service.getSocietyActions(this.reference, this.societyReference)
        .subscribe(response => this.actions = response,
          error =>
            this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts', 'error']));
    } else if (this.isSociety()) {

      this.reference = null;
      this.societyReference = activeRoute.snapshot.parent.params['reference'];
      this.societyContactService.getSocietyContacts(this.societyReference)
        .subscribe(response => this.contacts = response);


      this.service.getSocietyActions(null, this.societyReference)
        .subscribe(response => this.actions = response,
          error =>
            this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts', 'error']));
    } else if (this.isProject()) {
      this.reference = activeRoute.snapshot.parent.params['reference'];
      this.service.getProjectActions(this.reference)
        .subscribe(response => this.actions = response,
          error =>
            this.router.navigate(['/' + activeRoute.snapshot.parent.url[0].toString(), 'error']));

    } else if (this.isNeed()) {
      this.reference = activeRoute.snapshot.parent.params['reference'];
      this.service.getNeedActions(this.reference)
        .subscribe(response => this.actions = response,
          error =>
            this.router.navigate(['/' + activeRoute.snapshot.parent.url[0].toString(), 'error']));
    }


    this.types = [
      {label: '', value: 'NOTE'},
      {label: 'Note', value: 'NOTE'},
      {label: 'Rappel / To do', value: 'RECALL'},
      {label: 'Présentation Client', value: 'CUSTOMER_PRESENTATION'},
      {label: 'Entretien Téléphonique', value: 'TELEPHONE_INTERVIEW'},
      {label: 'Entretien Physique', value: 'PHYSICAL_INTERVIEW'},
      {label: 'Appel', value: 'CALL'},
      {label: 'Email', value: 'EMAIL'}];

  }

  isProject() {
    return this.contactType === 'projects';
  }

  isNeed() {
    return this.contactType === 'needs';
  }

  isSociety() {
    return this.contactType === 'societies';
  }

  isSocietyContact() {
    return this.contactType === 'contacts';
  }

  isDeveloper() {
    return this.contactType === 'developers';
  }

  isResource() {
    return this.contactType === 'resources';
  }

  showAction(index: number, form: NgForm) {
    const act = this.actions[index];

    if (act.reference !== this.action.reference) {
      form.resetForm();

      this.action = Object.assign({}, this.actions[index]);
      this.editing = true;
    }
  }

  newAction(form: NgForm) {
    form.resetForm();

    this.action = new Action();
    this.editing = false;

  }

  deleteAction(index: number) {
    if (confirm('Suppression de l\'Action')) {
      const act = this.actions[index];

      if (act.reference === this.action.reference) {
        this.action = new Action();
        this.editing = false;
      }

      if (this.isDeveloper() || this.isResource()) {
        this.service.deleteAction(act.reference, this.reference).subscribe(response => {

          this.actions.splice(index, 1);
          this.toastr.success('Action supprimée avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de l\'Action', 'Opération échoué !!!');
        });
      } else if (this.isSocietyContact()) {
        this.service.deleteSocietyAction(act.reference, this.reference, this.societyReference)
          .subscribe(response => {

            this.actions.splice(index, 1);
            this.toastr.success('Action supprimée avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la suppression de l\'Action', 'Opération échoué !!!');
          });
      } else if (this.isSociety()) {
        this.service.deleteSocietyAction(act.reference, act.societyContactReference, this.societyReference)
          .subscribe(response => {

            this.actions.splice(index, 1);
            this.toastr.success('Action supprimée avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la suppression de l\'Action', 'Opération échoué !!!');
          });
      } else if (this.isProject()) {

        this.service.deleteProjectAction(act.reference, this.reference).subscribe(response => {

          this.actions.splice(index, 1);
          this.toastr.success('Action supprimée avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de l\'Action', 'Opération échoué !!!');
        });
      } else if (this.isNeed()) {

        this.service.deleteNeedAction(act.reference, this.reference).subscribe(response => {

          this.actions.splice(index, 1);
          this.toastr.success('Action supprimée avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de l\'Action', 'Opération échoué !!!');
        });
      }
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.isDeveloper() || this.isResource()) {
        if (this.editing) {

          this.service.updateAction(this.action, this.action.reference, this.reference)
            .subscribe(response => {

              this.service.getActions(this.reference).subscribe(res => this.actions = res);
              this.action = new Action();
              this.editing = false;
              this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');


            }, error => {
              this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');
            });
        } else {
          if (this.action.date < new Date()) {
            Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
          } else {
            this.service.createAction(this.action, this.reference)
              .subscribe(response => {
                this.service.getActions(this.reference).subscribe(res => this.actions = res);
                this.action = new Action();
                this.toastr.success('Action Créé avec succés', 'Opération Réussite!');
              }, error => {
                this.toastr.error('Erreur lors de la création de l\'Action', 'Opération échoué !!!');
              });
          }
        }
      } else if (this.isSocietyContact() || this.isSociety()) {

        if (this.editing) {

          this.service.updateSocietyAction(this.action, this.action.reference, this.reference, this.societyReference)
            .subscribe(response => {

              this.service.getSocietyActions(this.reference, this.societyReference)
                .subscribe(res => this.actions = res);
              this.action = new Action();
              this.editing = false;
              this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');


            }, error => {
              this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');
            });
        } else {

          if (this.action.date < new Date()) {
            Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
          } else {
            this.service.createSocietyAction(this.action, this.isSocietyContact() ? this.reference : this.action.societyContactReference,
              this.societyReference)
              .subscribe(response => {

                this.service.getSocietyActions(this.reference, this.societyReference).subscribe(res => this.actions = res);
                this.action = new Action();
                this.toastr.success('Action Créé avec succés', 'Opération Réussite!');

              }, error => {
                this.toastr.error('Erreur lors de la création de l\'Action', 'Opération échoué !!!');
              });
          }
        }
      } else if (this.isProject()) {
        if (this.editing) {

          this.service.updateProjectAction(this.action, this.action.reference, this.reference)
            .subscribe(response => {

              this.service.getProjectActions(this.reference).subscribe(res => this.actions = res);
              this.action = new Action();
              this.editing = false;
              this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');


            }, error => {
              this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');
            });
        } else {

          if (this.action.date < new Date()) {
            Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
          } else {
            this.service.createProjectAction(this.action, this.reference)
              .subscribe(response => {

                this.service.getProjectActions(this.reference).subscribe(res => this.actions = res);
                this.action = new Action();
                this.toastr.success('Action Créé avec succés', 'Opération Réussite!');

              }, error => {
                this.toastr.error('Erreur lors de la création de l\'Action', 'Opération échoué !!!');
              });
          }
        }
      } else if (this.isNeed()) {
        if (this.editing) {

          this.service.updateNeedAction(this.action, this.action.reference, this.reference)
            .subscribe(response => {

              this.service.getNeedActions(this.reference).subscribe(res => this.actions = res);
              this.action = new Action();
              this.editing = false;
              this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');


            }, error => {
              this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');
            });
        } else {
          if (this.action.date < new Date()) {
            Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
          } else {
            this.service.createNeedAction(this.action, this.reference)
              .subscribe(response => {

                this.service.getNeedActions(this.reference).subscribe(res => this.actions = res);
                this.action = new Action();
                this.toastr.success('Action Créé avec succés', 'Opération Réussite!');

              }, error => {
                this.toastr.error('Erreur lors de la création de l\'Action', 'Opération échoué !!!');
              });
          }
        }
      }
      form.resetForm();

    }

  }
}
