import { Component, OnInit } from '@angular/core';
import {AbsenceListService} from '../../shared/services/AbsenceListService';
import {ToastrService} from 'ngx-toastr';
import {AbsenceService} from '../../shared/services/AbsenceService';

@Component({
  selector: 'app-list-absences',
  templateUrl: './list-absences.component.html',
  styleUrls: ['./list-absences.component.css']
})
export class ListAbsencesComponent implements OnInit {
  absences: any = [];
  headElements = ['project title', 'Client', 'Start Date', 'End Date'];
  constructor(private service: AbsenceService,
              private toastr: ToastrService,
              private absenceService: AbsenceService) { }

  ngOnInit() {
    this.loadAbsences() ;
  }
  loadAbsences() {
    return this.service.getAllAbcense().subscribe((data: {}) => {
      this.absences = data;

    });
  }
}
