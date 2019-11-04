import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Resource} from '../shared/entities/resource.model';
import {ResourceService} from '../shared/services/resource.service';

@Component({
  moduleId: module.id,
  templateUrl: 'resource-editor.component.html'
})
export class ResourceEditorComponent {

  editing = false;
  resource: Resource = new Resource();
  users: User[];

  resourceTypes: any[];
  resourceStages: any[];

  constructor(private service: ResourceService, private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    userService.getUsers().subscribe(response => this.users = response);
    if (this.editing) {
      service.getResource(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.resource = response
          , error =>
            this.router.navigate(['/resources', 'error']));
    }

    this.resourceStages = [
      {label: '', value: 'NOT_DEFINED'},
      {label: 'En cours', value: 'InProgress'},
      {label: 'Intercontrat', value: 'InterContract'},
      {label: 'Sortie', value: 'Exit'}
    ];


    this.resourceTypes = [
      {label: '', value: 'NOT_DEFINED'},
      {label: 'Consultant Interne', value: 'InternalConsultant'},
      {label: 'Consultant Externe', value: 'ExternalConsultant'},
      {label: 'Ingénieur d\'affaire', value: 'BusinessEngineer'},
      {label: 'Responsable d\'agence', value: 'AgencyManager'},
      {label: 'Directeur', value: 'Director'},
      {label: 'Chargé de recrutement', value: 'RecruitmentOfficer'},
      {label: 'Responsable RH', value: 'HRManager'},
      {label: 'Office Manager', value: 'OfficeManager'},
      {label: 'Comptabilité', value: 'Accounting'}];
  }


  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        this.service.updateResource(this.resource, this.resource.reference)
          .subscribe(
            response => {

              this.resource = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createResources(this.resource)
          .subscribe(response => {

            this.toastr.success('Resource Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/resources/edit', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création du candidats', 'Opération échoué !!!');
          });
      }
    }
  }
}
