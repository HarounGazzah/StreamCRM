import {Component} from '@angular/core';
import {Society} from '../shared/entities/society.model';
import {User} from '../shared/entities/user.model';
import {SocietyService} from '../shared/services/society.service';
import {UserService} from '../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-society-add-dialog',
  templateUrl: './society-add-dialog.component.html',
  styleUrls: ['./society-add-dialog.component.css']
})
export class SocietyAddDialogComponent {

  editing = false;
  society: Society = new Society();
  serviceTitle = '';
  users: User[];
  stages: any[];


  constructor(private service: SocietyService, private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              public dialogRef: MatDialogRef<SocietyAddDialogComponent>) {

    userService.getUsers().subscribe(response => this.users = response);


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
      this.society.stage = 'Prospect';
      this.service.createSociety(this.society)
        .subscribe(response => {
          this.onClose();
          this.toastr.success('Societé Créé avec succés', 'Opération Réussite!');
          this.router.navigate(['/societies/edit', response.reference]);

        }, error => {
          this.toastr.error('La Societé' + this.society.label + 'déjà exisitant', 'Opération échoué !!!');
        });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
