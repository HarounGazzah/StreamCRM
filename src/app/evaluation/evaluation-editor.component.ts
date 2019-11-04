import {Evaluation} from '../shared/entities/evaluation.model';
import {EvaluationService} from '../shared/services/evaluation.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-evaluation',
  moduleId: module.id,
  templateUrl: 'evaluation-editor.component.html'
})
export class EvaluationEditorComponent {

  editing = false;
  evaluation: Evaluation = new Evaluation();
  reference: string;
  contactType = '';


  evaluations: Evaluation[];


  constructor(private service: EvaluationService, private router: Router, private toastr: ToastrService,
              activeRoute: ActivatedRoute) {

    this.reference = activeRoute.snapshot.parent.params['reference'];
    this.contactType = activeRoute.snapshot.parent.url[0].toString();

    this.service.getEvaluations(this.reference)
      .subscribe(response => this.evaluations = response
        , error => {
          this.router.navigate(['/' + this.contactType, 'error']);
        });


  }

  isDeveloper() {
    return this.contactType === 'developers';
  }

  showEvaluation(index: number, form: NgForm) {

    form.resetForm();

    this.evaluation = Object.assign({}, this.evaluations[index]);
    this.editing = true;

  }

  newEvaluation(form: NgForm) {

    form.resetForm();

    this.evaluation = new Evaluation();
    this.editing = false;
  }


  deleteEvaluation(index: number) {

    if (confirm('Suppression de l\'Evaluation')) {
      const act = this.evaluations[index];

      if (act.reference === this.evaluation.reference) {
        this.evaluation = new Evaluation();
        this.editing = false;
      }


      this.service.deleteEvaluation(act.reference, this.reference)
        .subscribe(response => {

          this.evaluations.splice(index, 1);
          this.toastr.success('Evaluation supprimée avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de L\'evaluation', 'Opération échoué !!!');
        });
    }

  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateEvaluation(this.evaluation, this.evaluation.reference, this.reference)
          .subscribe(response => {
            this.service.getEvaluations(this.reference).subscribe(res => this.evaluations = res);
            this.evaluation = new Evaluation();
            this.editing = false;
            this.toastr.success('Evaluation Mise à jour avec succés', 'Opération Réussite!');


          }, error => {
            this.toastr.error('Erreur lors de la mise à jour de l\'Evaluation', 'Opération échoué !!!');
          });
      } else {
        this.service.createEvaluation(this.evaluation, this.reference)
          .subscribe(response => {
            this.service.getEvaluations(this.reference).subscribe(res => this.evaluations = res);
            this.evaluation = new Evaluation();
            this.editing = false;
            this.toastr.success('Evaluation Créé avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la création de l\'Evaluation', 'Opération échoué !!!');
          });
      }
      form.resetForm();

    }
  }
}
