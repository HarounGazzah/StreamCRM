import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CalendarEvent} from 'angular-calendar';
import {CalendarEventModel} from '../event.model';
import {MatColors} from '../../../@fuse/mat-colors';
import {PositioningService} from '../../shared/services/positioning.service';
import {Subject} from 'rxjs';
import {Positioning} from '../../shared/entities/positioning.model';
import {TimeLine} from '../../shared/entities/time-line.model';
import {EventService} from '../../shared/services/event.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { SharingService } from '../../shared/services/sharing.service';
import { Globals } from '../../shared/global/globals';


@Component({
  selector: 'calendar-event-form-dialog',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent implements OnInit {
  resources: any = [];
  positioning: Positioning = new Positioning;
  timeLine: TimeLine = new TimeLine;
  prj: string;
  action: string;
  event: any;
  eventForm: FormGroup;
  dialogTitle: string;
  presetColors = MatColors.presets;
  resourcesLoading = false;
  resourcesInput$ = new Subject<string>();
  positionings: any = [];
  private  startD:any = null;
  selectedProject;
  importedEvent;
  note;
  temps = [{
    value : -1,
    label : 'Absent'
  },{
    value : 0.5,
    label : 'Demi Journée'
  },{
    value : 1,
    label : 'Journée'
  }];

  absences = [{
    value: 'cp',
    label: 'Congé payant'
  },
  {
    value: 'cs',
    label: 'Congé sans solde'
  },
  {
    value: 'm',
    label: 'Maladie'
  },
  {
    value: 'e',
    label: 'Exeptionnelle'
  }];

  timeWorked;
  /**
   * Constructor
   *
   * @param service
   * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */

  constructor(
    private service: PositioningService,
    private router: Router,
    public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
    private eventService: EventService,
    private sharingService: SharingService,
    private positionningService: PositioningService,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private globals: Globals
  ) {
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = this.timeLine.project;
    } else {
      this.dialogTitle = this.timeLine.project;
      this.startD = _data.date
      this.event = new CalendarEventModel({
        start: _data.date,
        end: _data.date
      });
    }

    this.eventForm = this.createEventForm();
  }
   /* private _formBuilder: FormBuilder
  ) {
    this.event = _data.event;
    this.action = _data.action;

    if (this.action === 'edit') {
      this.dialogTitle = this.event.title;
    } else {
      this.dialogTitle = '';
      this.event = new CalendarEventModel({
        start: _data.date,
        end: _data.date
      });
    }

    this.eventForm = this.createEventForm();
  }*/

  ngOnInit() {
    this.positionningService.getPositioningsRsource().subscribe(res => {
      this.positionings = res;
      this.sharingService.currentMessage.subscribe(res => {
        const ev = JSON.parse(res);
        this.event = this.globals.events[ev.index];
        
        this.selectedProject = this.event.project;
        this.importedEvent = ev;
      });
    });
  }

  createEventForm1(): FormGroup {
    return new FormGroup({
      title: new FormControl(this.event.title),
      start: new FormControl(this.event.start),
      end: new FormControl(this.event.end),
      allDay: new FormControl(this.event.allDay),
      color: this._formBuilder.group({
        primary: new FormControl(this.event.color.primary),
        secondary: new FormControl(this.event.color.secondary)
      }),
      meta:
        this._formBuilder.group({
          notes: new FormControl(this.event.meta.notes)
        })
    });
  }

  createEventForm(): FormGroup {

      return new FormGroup({

      title: new FormControl(this.timeLine.project),
      start: new FormControl(this.timeLine.start),
      timeWork: new FormControl(this.timeLine.timeWork),
      firstName: new FormControl()
    });



  }
  loadPosistionning() {
    return this.service.getPositioningsRsource().subscribe((data: {}) => {
      this.positionings = data as [];

    });
  }


  save() {
    this.importedEvent.events[this.importedEvent.index].project = this.event.project;
    this.importedEvent.events[this.importedEvent.index].note = this.event.note;
    this.importedEvent.events[this.importedEvent.index].temp = this.event.temp;
    const dt: Date = new Date(this.event.start);
    this.importedEvent.events[this.importedEvent.index].start = dt;

    this.globals.events[this.importedEvent.index] = this.importedEvent.events[this.importedEvent.index] ;
    console.log('SAVE :: ', this.globals.events[0])
    //this.sharingService.changeMessage(JSON.stringify(this.importedEvent));
  }

  deleteEvent() {
    const event = JSON.parse(sessionStorage['event']);
    console.log(event.reference);
  }

  editEvent() {
    let dt: Date = new Date(this.event.start);

    let newEv: any = {
      //"reference": this.event.reference,
      //"timeListReference": this.event.reference,
      "project": this.event.project,
      "note": this.event.note,
      "start": new Date(dt.setDate(dt.getDate() + 1))
    }
    console.log(this.event);
    this.eventService.updateEvent(this.event.reference, newEv).subscribe(res => {
      console.log("UPDATE :: ", res);
    })
    //console.log(event.reference);
  }
}
