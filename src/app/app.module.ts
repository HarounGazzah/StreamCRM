import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {ChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DeveloperModule} from './developer/developer.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ToastrModule} from 'ngx-toastr';
import {LoaderModule} from './loader/loader.module';
import {SocietyModule} from './society/society.module';
import {SocietyContactModule} from './society-contact/society-contact.module';
import {appRoutes} from './routes';
import {AdminModule} from './admin/admin.module';
import {ProfilModule} from './profil/profil.module';
import {AppNavbarModule} from './app-navbar/app-navbar.module';
import {ResourceModule} from './resource/resource.module';
import {ProjectModule} from './project/project.module';
import {NeedModule} from './need/need.module';
import {PositioningModule} from './positioning/positioning.module';
import {PositioningAddComponent} from './positioning-add/positioning-add.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {PositioningEditComponent} from './positioning-edit/positioning-edit.component';

import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatPaginatorModule, MatTableModule, MatTabsModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {ButtonsModule, IconsModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';

import {InputTextModule} from 'primeng/inputtext';
import {FooterComponent} from './footer/footer.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeDbService} from './fake-db/fake-db.service';
// import {CalendarModule} from 'angular-calendar';
import {FuseModule} from '../@fuse/fuse.module';
import {fuseConfig} from './fuse-config';
import {ResourceNavbarModule} from './resource-navbar/resource-navbar.module';
import {ResourceDashboardComponent} from './resource-dashboard/resource-dashboard.component';
import {CalendarModule} from './calendar/calendar.module';
import {AbsenceModule} from './absence/absence.module';

import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NeedAddDialogComponent} from './need/need-add-dialog.component';
import {SharedModule} from './shared/shared.module';
import {SocietyAddDialogComponent} from './society/society-add-dialog.component';
import {UserAddDialogComponent} from './users/user-add-dialog.component';

import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {Ng2FileSizeModule} from 'ng2-file-size';
import {Globals} from './shared/global/globals';
import {BillTableComponent} from './bill/bill-table.component';
import {BillComponent} from './bill/bill.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {BillEditorComponent} from './bill/bill-editor.component';
import {BillAddDialogComponent} from './bill/bill-add-dialog.component';
import {AbsenceValidationComponent} from './absence-validation/absence-validation.component';
import {StatComponent} from './stat/stat.component';


registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    PositioningAddComponent,
    PositioningEditComponent,
    FooterComponent,
    ResourceDashboardComponent,
    NeedAddDialogComponent,
    SocietyAddDialogComponent,
    UserAddDialogComponent,
    BillTableComponent,
    BillComponent,
    BillEditorComponent,
    BillAddDialogComponent,
    StatComponent,
    UserAddDialogComponent,
    AbsenceValidationComponent
  ],
  imports: [
    MDBBootstrapModule,
    NavbarModule,
    ButtonsModule,
    WavesModule,
    IconsModule,
    BrowserModule,
    HttpClientModule,
    AppNavbarModule,
    LoaderModule,
    SocietyModule,
    AdminModule,
    ProfilModule,
    PositioningModule,
    DeveloperModule,
    AuthModule,
    SocietyContactModule,
    ResourceModule,
    AbsenceModule,
    ProjectModule,
    NeedModule,
    ResourceNavbarModule,
    CalendarModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgxMatSelectSearchModule,
    BsDatepickerModule,
    [SweetAlert2Module.forRoot()],
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    BrowserAnimationsModule,
    InputTextModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    FuseModule.forRoot(fuseConfig),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule, Ng2FileSizeModule, Ng2SmartTableModule, ChartsModule,
    MatTableModule, MatPaginatorModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    Globals,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent],
  exports: [
    ResourceDashboardComponent,
  ],
  entryComponents: [
    PositioningAddComponent,
    NeedAddDialogComponent,
    SocietyAddDialogComponent,
    UserAddDialogComponent]
})
export class AppModule {
}
