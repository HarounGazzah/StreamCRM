import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '../../@fuse/animations';
import { CalendarService } from './calendar.service';
import { CalendarEventModel } from './event.model';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { FuseSidebarService } from '../../@fuse/components/sidebar/sidebar.service';
import { AuthService } from '../shared/services/auth.service';
import { ResourceNavbarService } from '../resource-navbar/rousource-navbar.service';
import { User } from '../shared/entities/user.model';
import { DeveloperService } from '../shared/services/developer.service';
import { Developer } from '../shared/entities/developer.model';
import { UserService } from '../shared/services/user.service';
import { HolidayComponent } from '../holiday/holiday.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PositioningService } from '../shared/services/positioning.service';
import { SharingService } from '../shared/services/sharing.service';
import { Globals } from '../shared/global/globals';
import { EventService } from '../shared/services/event.service';
import { ProjectService } from '../shared/services/project.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
  actions: CalendarEventAction[];
  activeDayIsOpen: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;
  events: any[];
  refresh: Subject<any> = new Subject();
  selectedDay: any;
  view: string;
  viewDate: Date;
  user$: Observable<User>;
  user: User;
  manager: User;
  developer: Developer;
  emailUser: any;
  userRef: any;
  selectedProject;
  eventsCount;

  holiday: HolidayComponent = new HolidayComponent();
  total = {
    production: 0,
    interne: 0,
    absence: 0
  }

  projects = [];
  allProject = [];
  constructor(
    private auth: AuthService,
    private devService: DeveloperService,
    private userService: UserService,
    private resourceNavbarService: ResourceNavbarService,
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    private _calendarService: CalendarService,
    private positionningService: PositioningService,
    private sharingService: SharingService,
    private globals: Globals,
    private eventService: EventService,
    private projectService: ProjectService) {
      this.view = 'month';
      this.viewDate = new Date();
      this.activeDayIsOpen = false;
      this.selectedDay = { date: startOfDay(new Date()) };

      this.actions = [];
  }

  ngOnInit(): void {
    this.positionningService.getPositioningsRsource().subscribe(res => {
      this.projects = res;
      this.allProject = res;
      this.setEvents();
    });
    /* this.projectService.getProjects().subscribe(
      res => {
        this.allProject = res;
        this.setEvents();
      }
    ) */
    if (this.auth.isAuthenticated()) {
      //this.positionningService.getPositioningsRsource().subscribe( res => console.log(res));

      this.user$ = this.auth.getCurrentUser();

      this.resourceNavbarService.update.subscribe(() => {
        this.user$ = this.auth.getCurrentUser();
      });

    }

    this.refresh.subscribe(updateDB => {
      if (updateDB) {
        this._calendarService.updateEvents(this.events);
      }
    });

    this._calendarService.onEventsUpdated.subscribe(events => {
      this.setEvents();
      this.refresh.next();
    });

    this.user$.subscribe(res => {
      const email = res.email;
      this.emailUser = email;
      /*
      this.devService.getDeveloperByEmail(this.emailUser).subscribe(response => {
        this.developer = response;
        this.userRef = response.managerReference;

        this.userService.getUser(this.developer.managerReference).subscribe(res => {
          this.manager = res;
        });
      });
      */
    });
  }
  resetMonth() {
    this.events = [];
    const startDate = new Date();
    let i = 1;
    startDate.setMonth(this.viewDate.getMonth());
    while (startDate.getMonth() == this.viewDate.getMonth()) {
      startDate.setDate(i);
      const ev = {
        start: new Date(startDate),
        title: this.selectedProject,
        project: this.selectedProject,
        type: { label: '', value: '' },
        note : '',
        temp : {
          value : 1,
          label : 'Journée'
        }
      }
      if (startDate.getDay() !== 6 && startDate.getDay() !== 0 && !this.holiday.isHoliday(startDate) && 
          startDate.getMonth() == this.viewDate.getMonth()) {
        this.events.push(ev);
      }
      i++;
    }
    this.globals.events = this.events;
  }
  resetMonth2(): void {
    this.events = [];
    const month = this.viewDate.getMonth();
    const newDate = new Date();
    //console.log(this.viewDate)
    newDate.setDate(1);
    newDate.setMonth(this.viewDate.getMonth());
    let dayOfMonth = 1;
    while (newDate.getMonth() === this.viewDate.getMonth() && dayOfMonth < 31) {
      const startDate = new Date();
      startDate.setDate(dayOfMonth);
      const ev = {
        start: new Date(startDate),
        title: this.selectedProject,
        project: this.selectedProject,
        note : '',
        temp : {
          value : 1,
          label : 'Journée'
        }
      }
      dayOfMonth++;
      if (startDate.getDay() !== 6 && startDate.getDay() !== 0 && !this.holiday.isHoliday(startDate)) {
        this.events.push(ev);
      }
    }
    this.globals.events = this.events;
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }

  getProjectByRef(ref) {
    let p = null;
    for(let i = 0; i < this.allProject.length; i++){
      if(this.allProject[i].reference == ref) {
        p = this.allProject[i];
        break;
      }
    }
    return p;
  }

  setEvents(): void {

    this._calendarService.getAllEvents().subscribe(res => {
      console.log("EVENTS :: ",res)
      const newRes = res as any[];
      const newEv = newRes.map(item => {
        const temp = {label: '', value: item.timeWork};

        if(item.timeWork == -1) {
          temp.label = 'Absent';
        } else if(item.timeWork == 1) {
          temp.label = 'Journée';
        } else {
          temp.label = 'Demi Journée';
        }

        item.project = this.getProjectByRef(item.project);

        item.temp = temp;
        item.start = new Date(item.start);
        return item;
      });
      this.events = newEv;
    });
  }


  /**
   * Before View Renderer
   *
   * @param {any} header
   * @param {any} body
   */
  beforeMonthViewRender({ body }): void {
    body.forEach(day => {
      if(day.events.length > 0) {
        day.badgeTotal = -2;
      }
    });

  }

  findEventByDate(date) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].start == date) {
        return this.events[i];
      }
    }
    return null;
  }

  /**
   * Day clicked
   *
   * @param {MonthViewDay} day
   */
  dayClicked(event): void {
    let d = -1;
    
    for(let i=0; i < this.events.length; i++) {

      let ndate = event.day.date;
      if(ndate.toDateString() == this.events[i].start.toDateString()){
        d = i;
        break;
      }
    }
    let ev = {
      index: d,
      date: event.day.date,
      project: this.selectedProject,
      events: this.events
    }
    this.sharingService.changeMessage(JSON.stringify(ev));
    this.globals.events = this.events;
  }

  /**
   * Event times changed
   * Event dropped or resized
   *
   * @param {CalendarEvent} event
   * @param {Date} newStart
   * @param {Date} newEnd
   */
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(true);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  deleteEvent(event): void {

    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log("DELETING :: ",event.reference);
        const eventIndex = this.events.indexOf(event);
        //this.events.splice(eventIndex, 1);
        this._calendarService.deleteEvent(event).subscribe(res => {
          // console.logconsole.log(res);
        });
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });

  }

  /**
   * Edit Event
   *
   * @param {string} action
   * @param {CalendarEvent} event
   */

  editEventBefore(action: string, event: any) {
    this._calendarService.getEventByRef(event.reference).subscribe(res => {
      this.editEvent(action, res);
    });
  }
  editEvent(action: string, event: any): void {
    this.dayClicked(event);
    sessionStorage.setItem('event', JSON.stringify(event));
    const eventIndex = this.events.indexOf(event);
    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        event: event,
        action: action
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

            this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
            this.refresh.next(true);

            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteEvent(event);

            break;
        }
      });
  }

  /**
   * Add Event
   */
  addEvent(): void {


    this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: this.selectedDay.date
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if(typeof response != 'undefined'){
          const newEvent = response.getRawValue();
        newEvent.actions = this.actions;
        this.events.push(newEvent);
        this.refresh.next(true);
        }
      });
  }

  toggleSidebar(): void {
    this._fuseSidebarService.getSidebar('my-left-sidebar').toggleOpen();
  }

  getValueWorked(temp, project) {
    if(temp.value == -1) this.total.absence++;
    else {
      if (project.client.toString().toLowerCase() == 'interne') {
        this.total.interne += temp.value;
      } else {
        this.total.production += temp.value;
      }
      this.total.absence = this.total.absence + (1 - temp.value)
    }
  }

  validateTimeSheet() {
    Swal.fire(
      'TimeSheet Envoyée!',
      '',
      'success'
    )
    //this.eventService.saveTimeList().subscribe(res =>{
      for(let i = 0; i < this.globals.events.length; i++) {
        this.getValueWorked(this.globals.events[i].temp, this.globals.events[i].project);
        this.events[i].start.setDate(this.events[i].start.getDate() + 1);
        this.eventService.saveTimeLine(this.globals.events[i]).subscribe(() =>
          {
            //
          })
      }
   // })
  }
}
