import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {SocietyContact, SocietyContactView} from '../entities/society-contact.model';

@Injectable()
export class SocietyContactService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getSocietyContact(societyContactReference: string, societyReference: string): Observable<SocietyContact> {

    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };

    return this.http.get<SocietyContact>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });

  }

  getSocietyContacts(societyReference: string): Observable<SocietyContactView[]> {

    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/all';

    const options = {params: new HttpParams().set('societyReference', societyReference)};

    return this.http.get<SocietyContactView[]>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }


  createSocietyContacts(societyContact: SocietyContact, societyReference: string): Observable<SocietyContact> {

    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts';
    const options = {
      params: new HttpParams().set('societyReference', societyReference)
    };
    return this.http.post<SocietyContact>(url, societyContact, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateSocietyContact(societyContact: SocietyContact, societyContactReference: string,
                       societyReference: string): Observable<SocietyContact> {
    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .put<SocietyContact>(url, societyContact, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  deleteSocietyContact(societyContactReference: string, societyReference: string) {
    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }


  getSocietyContactContact(societyContactReference: string, societyReference: string): Observable<Contact> {
    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/contact';


    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this
      .http
      .get<Contact>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateSocietyContactContact(contact: Contact, societyContactReference: string, societyReference: string): Observable<Contact> {
    //this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/contact';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .put<Contact>(url, contact, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }




}
