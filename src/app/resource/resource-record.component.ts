import {Component, OnInit} from '@angular/core';
import {DeveloperService} from '../shared/services/developer.service';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonalInformation} from '../shared/entities/personal-information.model';
import {Developer} from '../shared/entities/developer.model';
import {Contact} from '../shared/entities/contact.model';
import {User} from '../shared/entities/user.model';
import {ResourceService} from '../shared/services/resource.service';
import {Resource} from '../shared/entities/resource.model';

@Component({
  selector: 'app-resource-record',
  templateUrl: './resource-record.component.html',
  styleUrls: ['./resource-record.component.css']
})
export class ResourceRecordComponent implements OnInit {

  urlToReturn = '';
  personalInfo: PersonalInformation;
  resource: Resource;
  contact: Contact;
  users: User[];
  stages: any[];

  constructor(private developerService: DeveloperService,
              private resourceService: ResourceService,
              private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.urlToReturn = '/' + activeRoute.snapshot.parent.url[0].toString();

    this.userService.getUsers().subscribe(response => this.users = response);


    resourceService.getResourceInfo(activeRoute.snapshot.parent.params['reference'])
      .subscribe(response => this.personalInfo = response
        ,
        error =>
          this.router.navigate([this.urlToReturn, 'error']));

    this.resourceService.getResource(this.activeRoute.snapshot.parent.params['reference'])
      .subscribe(response => {
          this.resource = response;
            this.router.navigate(['/resources/edit', this.resource.reference]);

        }
        , error =>
          this.router.navigate(['/developers', 'error']));

    this.resourceService.getResourceContact(this.activeRoute.snapshot.parent.params['reference'])
      .subscribe(response => {
          this.contact = response;
            this.router.navigate(['/resources/edit', this.resource.reference]);
        }
        , error =>
          this.router.navigate(['/developers', 'error']));
  }

  ngOnInit() {
    // this.stages = [
    //   {label: 'A traiter', value: 'ToTreat'},
    //   {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
    //   {label: 'Attente qualif manager', value: 'InTheProcessOfQualifying'},
    //   {label: 'Vivier', value: 'Vivier'},
    //   {label: 'Vivier ++', value: 'VivierPlus'},
    //   {label: 'Converti en Ressource', value: 'ConvertedToResource'},
    //   {label: 'Ne plus contacter', value: 'StopContacting'}
    // ];
  }

}
