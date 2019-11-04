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
import {PositioningTableComponent} from './positioning-table.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material';

import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';


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
    Ng2SmartTableModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule,
    ActionModule, AngularFontAwesomeModule
  ],
  declarations: [PositioningTableComponent],
  exports: [PositioningTableComponent]
})
export class PositioningModule {
}


