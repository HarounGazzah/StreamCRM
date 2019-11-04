import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ResourceNavbarComponent} from './resource-navbar.component';
import {SharedModule} from '../shared/shared.module';
import {ResourceNavbarService} from './rousource-navbar.service';
import {RouterModule} from '@angular/router';
// import { NavbarModule, ButtonsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
// Angular Forms Modules

@NgModule({
  declarations: [ResourceNavbarComponent],
  imports: [BrowserModule, RouterModule, SharedModule, MatIconModule],
  exports: [ResourceNavbarComponent],
  providers: [ResourceNavbarService],
})

export class ResourceNavbarModule {
}
