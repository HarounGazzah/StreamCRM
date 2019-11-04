import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {CV} from '../entities/cv.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {Resource, ResourceView} from '../entities/resource.model';


@Injectable()
export class ResourceService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getResource(reference: string): Observable<Resource> {

    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = {params: new HttpParams().set('resourceReference', reference)};

    return this.http.get<Resource>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });

  }

  getResources(): Observable<ResourceView[]> {

    // this.loaderService.show();
    //  const url = environment.API + '/ws/resources';

    const url = environment.API + '/ws/resources/all';

    return this.http.get<ResourceView[]>(url)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  createResources(resource: Resource): Observable<Resource> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources';
    return this.http.post<Resource>(url, resource)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  createResourceFromDeveloper(developerReference: string): Observable<Resource> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/from-developer';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .post<Resource>(url, null, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateResource(resource: Resource, reference: string): Observable<Resource> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = {params: new HttpParams().set('resourceReference', reference)};


    return this.http
      .put<Resource>(url, resource, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  deleteResource(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = {params: new HttpParams().set('resourceReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getResourceSkills(resourceReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/skills';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this.http.get<SkillsInformation>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateResourceSkills(skills: SkillsInformation, resourceReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/skills';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this.http
      .put<SkillsInformation>(url, skills, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  getResourceInfo(resourceReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/personal_info';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this
      .http
      .get<PersonalInformation>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateResourceInfo(info: PersonalInformation, resourceReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/personal_info';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this.http
      .put<PersonalInformation>(url, info, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getResourceContact(resourceReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/contact';


    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this
      .http
      .get<Contact>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateResourceContact(contact: Contact, resourceReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/contact';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this.http
      .put<Contact>(url, contact, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  getResourceCVs(resourceReference: string): Observable<CV[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this
      .http
      .get<CV[]>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  createResourceCv(fileToUpload: File, resourceReference: string): Observable<CV> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};


    return this.http
      .put<CV>(url, formData, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  deleteCV(reference: string, resourceReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const options = {params: new HttpParams().set('resourceReference', resourceReference).set('reference', reference)};


    return this.http
      .delete(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  searchResources(term: string): Observable<ResourceView[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/auto-complete';
    const options = {params: new HttpParams().set('term', term)};
    return this.http.get<ResourceView[]>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  resourceCount(): Observable<Resource> {
    const url = environment.API + '/ws/resources/count';
    return this.http.get<Resource>(url)
      ._finally(() => {
      });
  }

  resourceByType(resourceType: string): Observable<ResourceView[]> {
    const url = environment.API + '/ws/resources/byType';
    const options = {params: new HttpParams().set('resourceType', resourceType)};
    return this.http.get<ResourceView[]>(url, options)
      ._finally(() => {
      });
  }
}
