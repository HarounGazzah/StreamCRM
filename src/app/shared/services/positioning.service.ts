import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {Positioning} from '../entities/positioning.model';


@Injectable()
export class PositioningService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getPositioning(positioningReference: string): Observable<Positioning> {

    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};

    return this.http.get<Positioning>(url, options)
      ._finally(() => {
        ////this.loaderService.hide();
      });

  }

  getPositionings(): Observable<Positioning[]> {

    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings/all';

    return this.http.get<Positioning[]>(url)
      ._finally(() => {
        ////this.loaderService.hide();
      });
  }


  createPositionings(positioning: Positioning): Observable<Positioning> {

    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    return this.http.post<Positioning>(url, positioning)
      ._finally(() => {
        ////this.loaderService.hide();
      });
  }

  updatePositioning(positioning: Positioning, positioningReference: string): Observable<Positioning> {
    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .put<Positioning>(url, positioning, options)
      ._finally(() => {
        ////this.loaderService.hide();
      });
  }

  deletePositioning(positioningReference: string) {
    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        ////this.loaderService.hide();
      });
  }

  getPositioningsRsource(): Observable<Positioning[]> {

    ////this.loaderService.show();
    const url = environment.API + '/ws/positionings/posRes';

    return this.http.get<Positioning[]>(url);
    //this.loaderService.hide();
  }

}
