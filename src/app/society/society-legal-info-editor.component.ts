import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LegalInformation} from '../shared/entities/legal-information.model';
import {SocietyService} from '../shared/services/society.service';

@Component({
  selector: 'app-legal-info',
  moduleId: module.id,
  templateUrl: 'society-legal-info-editor.component.html'
})
export class SocietyLegalInfoEditorComponent {

  editing = false;
  legalInfo: LegalInformation = new LegalInformation();


  constructor(private service: SocietyService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['reference'] !== undefined;

    if (this.editing) {
      service.getSocietyLegalInformation(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.legalInfo = response
          ,
          error =>
            this.router.navigate(['/societies', 'error']));
    }

  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        this.service.updateSocietyLegalInformation(this.legalInfo, this.legalInfo.societyReference)
          .subscribe(response => {

            this.legalInfo = response;
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          });
      }
    }
  }
}
