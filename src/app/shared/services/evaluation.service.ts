import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Evaluation} from '../entities/evaluation.model';
import {HttpClient, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";


@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getEvaluations(developerReference: string): Observable<Evaluation[]> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<Evaluation[]>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }


  createEvaluation(evaluation: Evaluation, developerReference: string): Observable<Evaluation> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http
      .post<Evaluation>(url, evaluation, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateEvaluation(evaluation: Evaluation, reference: string, developerReference: string): Observable<Evaluation> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .put<Evaluation>(url, evaluation, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  deleteEvaluation(reference: string, developerReference: string) {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

}
