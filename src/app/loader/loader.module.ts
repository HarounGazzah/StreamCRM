import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoaderComponent} from './loader.component';
import {SharedModule} from '../shared/shared.module';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule
  ],
  exports: [
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ]
})

export class LoaderModule {
}
