import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2FileSizeModule} from 'ng2-file-size';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {EvaluationModule} from '../evaluation/evaluation.module';
import {ActionModule} from '../action/action.module';
import {ContactModule} from '../contact/contact.module';

import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';
import {AbsenceComponent} from './absence.component';
import {AbsenceDemandeComponent} from './absence-demande/absence-demande.component';
import {MultiDatePickerComponent} from './multi-date-picker/multi-date-picker.component';
import {NgbButtonsModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ListAbsencesComponent } from './list-absences/list-absences.component';
import {MatFormFieldModule, MatSelectModule, MatTabsModule} from '@angular/material';
import { AbsenceCountComponent } from './absence-count/absence-count.component';


@NgModule({
  imports: [
    ButtonsModule, WavesModule, CardsFreeModule,
    SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    Ng2FileSizeModule,
    CommonModule,
    Ng2SmartTableModule,
    EvaluationModule,
    ActionModule,
    ContactModule, NgbDatepickerModule, TableModule, NgbButtonsModule, ButtonModule, MatTabsModule, MatFormFieldModule, MatSelectModule],
  declarations: [
    AbsenceComponent, AbsenceDemandeComponent, MultiDatePickerComponent, ListAbsencesComponent, AbsenceCountComponent ],
  exports: [AbsenceComponent, AbsenceDemandeComponent, MultiDatePickerComponent, ListAbsencesComponent ]
})
export class AbsenceModule {
}

