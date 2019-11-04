import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';

import {LoaderService} from './loader.service';
import {TimeLine} from '../entities/time-line.model';
import {DeveloperService} from './developer.service';

@Injectable()
export class EventService {

  constructor(private http: HttpClient, private loaderService: LoaderService, private devService: DeveloperService) {
  }

  getTimeLine(reference: string): Observable<TimeLine> {

    //this.loaderService.show();
    const url = environment.API + '/ws/time_line';

    const options = {params: new HttpParams().set('reference', reference)};

    return this.http.get<TimeLine>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });

  }

  /*getPositionings(): Observable<Positioning[]> {

    //this.loaderService.show();
    const url = environment.API + '/ws/positionings/all';

    return this.http.get<Positioning[]>(url)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }*/

  saveTimeLine(event: any){
    const url = environment.API + '/ws/time_line/save';
    const ref = sessionStorage['ref'];
    const timeLine: TimeLine = {
      reference: '',
      timeListReference: '',
      project : event.project.reference,
      note: event.note,
      timeWork: event.temp.value,
      start: event.start,
      resourceReference: ref
    };
    return this.http.post<TimeLine>(url, timeLine);
  }

  createTimeLine(timeLine: TimeLine): any{


    //this.loaderService.show();
    const url = environment.API + '/ws/time_line';

    const ref = sessionStorage['ref'];
    timeLine.resourceReference = ref;
    return this.http.post<TimeLine>(url, timeLine)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateEvent(reference, event) {
    console.log("SERVER :: ",event)
    return this.http.put("http://localhost:9090/ws/time_line?ligneTempsReference="+reference,event);
  }

  getPeriod(month, year){
    //TO DO get all events from database by month and year
    
  }

 /* updatePositioning(positioning: Positioning, positioningReference: string): Observable<Positioning> {
    //this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .put<Positioning>(url, positioning, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }*/

  /*deletePositioning(positioningReference: string) {
    //this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }*/

 /* getPositioningsRsource(): Observable<Positioning[]> {

    //this.loaderService.show();
    const url = environment.API + '/ws/positionings/posRes';

    return this.http.get<Positioning[]>(url)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }*/

}
