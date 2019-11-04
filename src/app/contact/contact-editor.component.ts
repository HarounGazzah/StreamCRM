import {Contact} from '../shared/entities/contact.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SocietyService} from '../shared/services/society.service';
import {SocietyContactService} from '../shared/services/society-contact.service';
import {ResourceService} from '../shared/services/resource.service';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'contact-editor.component.html'
})
export class ContactEditorComponent {

  contact: Contact = new Contact();
  contactType = '';
  societyReference = '';


  constructor(private developerService: DeveloperService,
              private resourceService: ResourceService,
              private societyService: SocietyService,
              private societyContactService: SocietyContactService,
              private router: Router,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute) {


    this.contactType = activeRoute.snapshot.parent.url[0].toString();

    if (this.isDeveloper()) {
      this.developerService.getDeveloperContact(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/developers', 'error']);
          });
    } else if (this.isSociety()) {
      this.societyService.getSocietyContact(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/societies', 'error']);
          });
    } else if (this.isResource()) {
      this.resourceService.getResourceContact(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/resources', 'error']);
          });
    } else {
      this.societyReference = activeRoute.snapshot.parent.parent.params['reference'];
      this.societyContactService.getSocietyContactContact(activeRoute.snapshot.parent.params['societyContactReference'],
        this.societyReference)
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/societies/edit/' + this.societyReference + '/contacts', 'error']);
          });
    }


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

  save(form: NgForm) {


    if (form.valid) {

      if (this.isDeveloper()) {
        this.developerService.updateDeveloperContact(this.contact, this.contact.ownerReference)
          .subscribe(response => {

            this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
          });
      } else if (this.isSociety()) {
        this.societyService.updateSocietyContact(this.contact, this.contact.ownerReference)
          .subscribe(response => {

            this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
          });
      } else if (this.isResource()) {
        this.resourceService.updateResourceContact(this.contact, this.contact.ownerReference)
          .subscribe(response => {

            this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
          });
      } else {
        this.societyContactService.updateSocietyContactContact(this.contact, this.contact.ownerReference, this.societyReference)
          .subscribe(response => {

            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour des Données', 'Opération échoué !!!');
          });
      }

    }
  }
}
