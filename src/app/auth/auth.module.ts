import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {AuthGuard, LoginGuard} from './auth.guard';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule, WavesModule} from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { ParticlesModule } from 'angular-particle';

// MDB Angular Free
// Angular Forms Modules

@NgModule({
  imports: [SharedModule, CommonModule, FormsModule, ReactiveFormsModule,
    InputsModule, WavesModule, ButtonsModule, MatButtonModule, ParticlesModule],
  providers: [AuthGuard, LoginGuard],
  exports: [AuthComponent],
  declarations: [AuthComponent]
})
export class AuthModule {
}
