import {SkillsInformation} from '../shared/entities/skills-information.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'skills-editor.component.html'
})
export class SkillsEditorComponent implements OnInit {

  editing = false;
  qualifTitle = '';
  skills: SkillsInformation = new SkillsInformation();
  experiences: any[];
  formations: any[];
  urlToReturn = '';


  constructor(private service: DeveloperService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';
    this.urlToReturn = '/' + this.activeRoute.snapshot.parent.url[0].toString();


    this.experiences = [
      {label: 'Non', value: 'NON'},
      {label: 'Entre 1 et 2 ans', value: 'BETWEEN1AND2'},
      {label: 'Entre 3 et 5 ans', value: 'BETWEEN3AND5'},
      {label: 'Entre 6 et 10 ans', value: 'BETWEEN6AND10'},
      {label: 'Plus que 10 ans', value: 'MORE_THAN_10'}];

    this.formations = [
      {label: 'Non défini', value: 'NOT_DEFINED'},
      {label: 'Bac', value: 'BAC'},
      {label: 'Bac +2', value: 'BAC_PLUS_2'},
      {label: 'Bac +3', value: 'BAC_PLUS_3'},
      {label: 'Bac +4', value: 'BAC_PLUS_4'},
      {label: 'Bac +5', value: 'BAC_PLUS_5'},
      {label: 'Bac +6', value: 'BAC_PLUS_6'},
      {label: 'Bac +7', value: 'BAC_PLUS_7'},
      {label: 'Bac +8', value: 'BAC_PLUS_8'}];


    if (this.editing) {
      this.service.getDeveloperSkills(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.skills = response,
          error =>
            this.router.navigate([this.urlToReturn, 'error']));
    }
  }

  addQualifications() {
    this.skills.qualifications.push(this.qualifTitle);
    this.qualifTitle = '';
  }

  removeQualification(i: number) {
    this.skills.qualifications.splice(i, 1);
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        this.service.updateDeveloperSkills(this.skills, this.skills.developerReference)
          .subscribe(res => {

            this.skills = res;
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          });
      }
    }

  }
}
