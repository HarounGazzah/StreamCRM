import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {UserService} from '../shared/services/user.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ResourceService} from '../shared/services/resource.service';
import {Contact} from '../shared/entities/contact.model';
import Swal from 'sweetalert2';

@Component({
  moduleId: module.id,
  templateUrl: 'developer-editor.component.html'
})
export class DeveloperEditorComponent implements OnInit {

  editing = false;
  developer: Developer = new Developer();
  users: User[];
  stages: any[];
  contacts: Contact;

  constructor(private service: DeveloperService,
              private resourceService: ResourceService,
              private developerService: DeveloperService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';

    // this.developerService.getDeveloperContact(this.activeRoute.snapshot.parent.params['reference']).subscribe(res => {
    //   this.contacts = res;
    // });

    this.userService.getUsers().subscribe(response => this.users = response);
    if (this.editing) {
      this.service.getDeveloper(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
            this.developer = response;
            if (this.developer.resource) {
              this.router.navigate(['/resources/edit', this.developer.reference]);
            }
          }
          , error =>
            this.router.navigate(['/developers', 'error']));
    }

    this.stages = [
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Attente qualif manager', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];
  }


  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        if (this.developer.availability < new Date()) {
          Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
        } else {
          this.service.updateDeveloper(this.developer, this.developer.reference)
            .subscribe(
              response => {

                this.developer = response;
                this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
                if (this.developer.resource) {
                  this.router.navigate(['/resources/edit', this.developer.reference]);
                  this.toastr.success('Nouvelle Resource ajoutée avec succés', 'Opération Réussite!');
                }

              }, error => {
                this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
              }
            );
        }

      } else {
        if (this.developer.availability < new Date()) {
          Swal.fire('Erreur de saisie !', 'Date doit etre superieur à la date de maintenant', 'error');
        } else {
          this.service.createDevelopers(this.developer)
            .subscribe(response => {

              this.toastr.success('Developpeur Créé avec succés', 'Opération Réussite!');
              if (this.developer.resource) {
                this.router.navigate(['/resources/edit', this.developer.reference]);
                this.toastr.success('Nouvelle Resource ajoutée avec succés', 'Opération Réussite!');
              } else {
                this.router.navigate(['/developers/edit', response.reference]);
              }
            }, error => {
              this.toastr.error('Erreur lors de la création du candidats', 'Opération échoué !!!');
            });
        }
      }
    }
  }

  convertToResource() {

    if (!this.developer.resource) {

      this.resourceService.createResourceFromDeveloper(this.developer.reference)
        .subscribe(
          response => {

            this.router.navigate(['/resources/edit', response.reference]);
            this.toastr.success('Nouvelle Resource ajoutée avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          }
        );
    } else {
      this.toastr.error('Resource Exist Déja', 'Opération échoué !!!');
    }
  }
}
