import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {Developer, DeveloperView} from '../entities/developer.model';
import {CV} from '../entities/cv.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';


@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getDeveloper(reference: string): Observable<Developer> {

    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http.get<Developer>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });

  }

  getDeveloperByEmail(email: string): Observable<Developer> {

    // this.loaderService.show();
    const url = environment.API + '/ws/developers/mail';

    const options = {params: new HttpParams().set('developerEmail', email)};

    return this.http.get<Developer>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });

  }

  getDevelopers(): Observable<DeveloperView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    return this.http.get<DeveloperView[]>(url)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  createDevelopers(developer: Developer): Observable<Developer> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';
    return this.http.post<Developer>(url, developer)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateDeveloper(developer: Developer, reference: string): Observable<Developer> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Developer>(url, developer, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  deleteDeveloper(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/skills';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<SkillsInformation>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/skills';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<SkillsInformation>(url, skills, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  getDeveloperInfo(developerReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<PersonalInformation>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<PersonalInformation>(url, info, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getDeveloperContact(developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/contact';


    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<Contact>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateDeveloperContact(contact: Contact, developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/contact';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<Contact>(url, contact, options)
      ._finally(() => {
        //  this.loaderService.hide();
      });
  }

  getDeveloperCVs(developerReference: string): Observable<CV[]> {
    //  this.loaderService.show();
    const url = environment.API + '/ws/developers/cv';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<CV[]>(url, options)
      ._finally(() => {
        //  this.loaderService.hide();
      });
  }

  createDeveloperFromCv(fileToUpload: File): Observable<DeveloperView> {
    //  this.loaderService.show();
    const url = environment.API + '/ws/developers/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    return this.http
      .post<DeveloperView>(url, formData)
      ._finally(() => {
        //  this.loaderService.hide();
      });
  }

  createDeveloperCv(fileToUpload: File, developerReference: string): Observable<CV> {
    //  this.loaderService.show();
    const url = environment.API + '/ws/developers/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<CV>(url, formData, options)
      ._finally(() => {
        //  this.loaderService.hide();
      });
  }

  deleteCV(reference: string, developerReference: string) {
    //  this.loaderService.show();
    const url = environment.API + '/ws/developers/cv';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options)
      ._finally(() => {
        //  this.loaderService.hide();
      });
  }

  getCurrentDeveloper(): Observable<Developer> {

    this.loaderService.show();
    const url = environment.API + '/ws/developers/currentResource';
    return this.http.get<Developer>(url)
      ._finally(() => {
        this.loaderService.hide();
      });

  }

  getCurrentLeave(): Observable<Developer> {

    this.loaderService.show();
    const url = environment.API + '/ws/developers/currentLeave';
    return this.http.get<Developer>(url)
      ._finally(() => {
        this.loaderService.hide();
      });

  }

  developersCount(): Observable<Developer> {
    const url = environment.API + '/ws/developers/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }
}
