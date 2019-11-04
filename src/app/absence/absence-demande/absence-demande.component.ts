import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {AbsenceListService} from '../../shared/services/AbsenceListService';
import {AbsenceList} from '../../shared/entities/AbsenceList.model';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, formatDate} from '@angular/common';
import {AbsenceService} from '../../shared/services/AbsenceService';
import {Absence} from '../../shared/entities/Absence.model';

@Component({
  selector: 'app-absence-demande',
  templateUrl: './absence-demande.component.html',
  styleUrls: ['./absence-demande.component.css']
})
export class AbsenceDemandeComponent implements OnInit {
  absenceList: AbsenceList = new AbsenceList();
  absence: Absence = new Absence();
  today = new Date();
  refAbs;
  test;
  type;
  duration: any[] = [];
  index;
  datesSelected: NgbDateStruct[] = [];


  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }

  constructor(private service: AbsenceListService,
              private toastr: ToastrService,
              private absenceService: AbsenceService
              ) {
  }

  ngOnInit() {}

  addPeriode() {

  }
  removeQualification(i: number) {
    this.datesSelected.splice(i, 1);
  }

  save(form: NgForm) {

    this.service.createAbsenceList(this.absenceList).subscribe(res => {

      this.saveAbsence(form, res.reference);
      console.log('success');


      console.log(res);
      console.log(res.reference);
      this.refAbs = res.reference;
      this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');

    }, error1 => {
      console.log('errrroorrr!!!');
      this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');

    });
  }
  saveAbsence(form: NgForm, reference) {
    const index = this.datesSelected;
    const ref = reference;
    console.log(index.length);
   for (let i = 0; i <  index.length; i++) {
     this.absence.type = this.type;
      this.absence.dateAbsence = new  Date(this.datesSelected[i].month+"-"+this.datesSelected[i].day+"-"+this.datesSelected[i].year);
      this.absence.dateAbsence.setDate(this.absence.dateAbsence.getDate() + 1);
      this.absence.duration = this.duration[i];
    this.absence.absenceListReference = reference;
      this.absenceService.createAbsence(this.absence).subscribe(res => {
      console.log('success');

      console.log(res);
      console.log(res.reference);
      this.refAbs = res.reference;
      this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');

    }, error1 => {
      console.log('errrroorrr!!!');
      this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');

    });
   }
  }

  log(ev, i: number) {
    this.duration[i] = ev.value;
    console.log(this.duration);
  }
}
