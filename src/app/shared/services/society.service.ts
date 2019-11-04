import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {Society, SocietyView} from '../entities/society.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {LegalInformation} from '../entities/legal-information.model';


@Injectable()
export class SocietyService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getSociety(reference: string): Observable<Society> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies';

    const options = {params: new HttpParams().set('societyReference', reference)};

    return this.http.get<Society>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });

  }

  searchSocieties(term: string): Observable<SocietyView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies/auto-complete';
    const options = {params: new HttpParams().set('term', term)};

    return this.http.get<SocietyView[]>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getSocieties(): Observable<SocietyView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies/all';

    return this.http.get<SocietyView[]>(url)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  createSociety(society: Society): Observable<Society> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';
    return this.http.post<Society>(url, society)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateSociety(society: Society, reference: string): Observable<Society> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';
    const options = {params: new HttpParams().set('societyReference', reference)};
    return this.http
      .put<Society>(url, society, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  deleteSociety(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';

    const options = {params: new HttpParams().set('societyReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getSocietyLegalInformation(societyReference: string): Observable<LegalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/legal_information';

    const options = {params: new HttpParams().set('societyReference', societyReference)};

    return this
      .http.get<LegalInformation>(url, options)
           ._finally(() => {
              // this.loaderService.hide();
      });
  }

  updateSocietyLegalInformation(info: LegalInformation, societyReference: string): Observable<LegalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/legal_information';

    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this.http
      .put<LegalInformation>(url, info, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getSocietyContact(societyReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contact';


    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this
      .http
      .get<Contact>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateSocietyContact(contact: Contact, societyReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contact';

    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this.http
      .put<Contact>(url, contact, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  societyCount(): Observable<Society> {
    const url = environment.API + '/ws/societies/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }


}
