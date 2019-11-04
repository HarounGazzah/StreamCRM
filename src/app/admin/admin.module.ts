import {SharedModule} from '../shared/shared.module';


import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {UserModule} from '../users/user.module';


@NgModule({
  imports: [SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    UserModule,
    RouterModule,
    CommonModule],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule {
}


