import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Language} from '../entities/language.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";


@Injectable()
export class LanguageService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getLanguages(): Observable<Language[]> {
    //this.loaderService.show();
    const url = environment.API + '/ws/languages';

    return this.http.get<Language[]>(url)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }


  createLanguages(language: Language) {
    //this.loaderService.show();
    const url = environment.API + '/ws/languages';
    return this.http
      .post<Language>(url, language)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateLanguage(language: Language, reference: string) {
    //this.loaderService.show();
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, language, {params: params})
      .map((res: HttpResponse<Language>) => res.body)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  deleteLanguage(reference: string) {
    //this.loaderService.show();
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .delete(url, {params: params})
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }


}
