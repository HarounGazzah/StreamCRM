import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AbsenceList} from '../entities/AbsenceList.model';

@Injectable()
export class AbsenceListService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }
  createAbsenceList(absenceList: AbsenceList): Observable<AbsenceList> {
    this.loaderService.show();
    const url = environment.API + '/ws/absenceList';
    return this.http.post<AbsenceList>(url, absenceList)
      ._finally(() => {
        this.loaderService.hide();
      });
  }
}

