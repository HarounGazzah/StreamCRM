import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {Project, ProjectInformation, ProjectView} from '../entities/project.model';
import {ProjectPos} from '../entities/project-pos.model';
import {Resource} from '../entities/resource.model';


@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  createProjectFromPositioning(positioningReference: string): Observable<ProjectPos> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos/from-positioning';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .post<ProjectPos>(url, null, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  getProject(projectReference: string): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};

    return this.http.get<ProjectPos>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });

  }

  getProjects(): Observable<ProjectPos[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos/all';

    return this.http.get<ProjectPos[]>(url)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  createProjectold(projectPos: ProjectPos): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    return this.http.post<ProjectPos>(url, projectPos)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  createProject(projectPos: ProjectPos): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projects';

    return this.http.post<ProjectPos>(url, projectPos)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateProject(project: ProjectPos, projectReference: string): Observable<ProjectPos> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<ProjectPos>(url, project, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  deleteProject(projectReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }


  getProjectInformation(projectReference: string): Observable<ProjectInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/information';


    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this
      .http
      .get<ProjectInformation>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  updateProjectInformation(info: ProjectInformation, projectReference: string): Observable<ProjectInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/information';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<ProjectInformation>(url, info, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  searchProjects(term: string): Observable<ProjectView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projects/auto-complete';
    const options = {params: new HttpParams().set('term', term)};

    return this.http.get<ProjectView[]>(url, options)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  projectCount(): Observable<ProjectPos> {
    const url = environment.API + '/ws/projectspos/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }
}
