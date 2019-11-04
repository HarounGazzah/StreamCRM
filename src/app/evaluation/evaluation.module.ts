import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {EvaluationEditorComponent} from './evaluation-editor.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {CardsFreeModule} from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    CardsFreeModule,
  ],
  exports: [
    EvaluationEditorComponent
  ],
  declarations: [
    EvaluationEditorComponent
  ]
})

export class EvaluationModule {
}
