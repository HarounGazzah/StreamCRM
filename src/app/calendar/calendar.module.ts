import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  MatButtonModule, MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule, MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ColorPickerModule} from 'ngx-color-picker';
import {CalendarModule as AngularCalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';


import {CalendarComponent} from './calendar.component';
import {CalendarService} from './calendar.service';
import {CalendarEventFormDialogComponent} from './event-form/event-form.component';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseThemeOptionsModule} from '../../@fuse/components';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {MDBRootModule} from 'angular-bootstrap-md';
import { PiecesJointesComponent } from './pieces-jointes/pieces-jointes.component';




const routes: Routes = [
  {
    path: 'timesheet',
    component: CalendarComponent,
    children: [],
    resolve: {
      chat: CalendarService
    }
  }
];

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarEventFormDialogComponent,
    PiecesJointesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,


    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    MatSelectModule,
    FuseThemeOptionsModule,
    NgSelectModule,
    MatCardModule,
    MatTabsModule,
    MDBRootModule

  ],
  providers: [
    CalendarService
  ],
  entryComponents: [
    CalendarEventFormDialogComponent

  ]
})
export class CalendarModule {
}
