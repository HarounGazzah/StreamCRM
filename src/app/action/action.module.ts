import {ActionTableComponent} from './action-table.component';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ActionEditorComponent} from './action-editor.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  imports: [
    FormsModule,
    MatButtonModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    ButtonsModule, WavesModule, CardsFreeModule, OwlDateTimeModule, MatIconModule],
  exports: [
    ActionEditorComponent,
    ActionTableComponent
  ],
  declarations: [
    ActionEditorComponent,
    ActionTableComponent
  ]
})

export class ActionModule {
}
