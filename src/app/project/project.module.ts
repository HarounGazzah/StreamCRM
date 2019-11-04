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
import {ActionModule} from '../action/action.module';
import {ProjectTableComponent} from './project-table.component';
import {ProjectEditorComponent} from './project-editor.component';
import {ProjectComponent} from './project.component';
import {ProjectInfoEditorComponent} from './project-info-editor.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';


import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';


@NgModule({
  imports: [
    ButtonsModule, WavesModule, CardsFreeModule, MatButtonModule, MatSelectModule,
    MatDatepickerModule,
    SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    Ng2FileSizeModule,
    MatIconModule, MatFormFieldModule, MatInputModule,
    CommonModule,
    Ng2SmartTableModule,
    ActionModule],
  declarations: [ProjectTableComponent, ProjectEditorComponent, ProjectInfoEditorComponent, ProjectComponent],
  exports: [ProjectTableComponent, ProjectEditorComponent, ProjectInfoEditorComponent, ProjectComponent]
})
export class ProjectModule {
}


