import {DeveloperService} from '../shared/services/developer.service';

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'developer-cv-scanner.component.html'
})
export class DeveloperCVScannerComponent {

  fileToUpload: File = null;
  f: File = null;


  constructor(private router: Router,
              activeRoute: ActivatedRoute, private service: DeveloperService,
              private toastr: ToastrService) {


  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(form: NgForm) {

    if (form.valid) {
      this.service.createDeveloperFromCv(this.fileToUpload)
        .subscribe(data => {
          this.toastr.success('Developpeur Créé avec succés', 'Opération Réussite!');
          this.router.navigate(['/developers/edit', data.reference]);
        }, error => {
          this.toastr.error('Erreur lors de la Création du CV', 'Opération échoué !!!');
        });
    }
  }


}
