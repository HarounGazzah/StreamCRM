import {SharedModule} from '../shared/shared.module';


import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {UserModule} from '../users/user.module';
import {ProfilComponent} from './profil.component';
import {ProfilPasswordEditorComponent} from './profil-password-editor.component';
import {MatIconModule, MatTabsModule, MatButtonModule} from '@angular/material';
import {CardsFreeModule} from 'angular-bootstrap-md';



@NgModule({
  imports: [SharedModule,
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    UserModule,
    RouterModule,
    CommonModule, MatTabsModule, CardsFreeModule, MatIconModule],
  declarations: [ProfilComponent, ProfilPasswordEditorComponent],
  exports: [ProfilComponent, ProfilPasswordEditorComponent]
})
export class ProfilModule {
}


