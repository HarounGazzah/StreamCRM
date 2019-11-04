import {Component, OnInit} from '@angular/core';
import {DeveloperService} from '../shared/services/developer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonalInformation} from '../shared/entities/personal-information.model';
import {Developer} from '../shared/entities/developer.model';
import {Contact} from '../shared/entities/contact.model';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/entities/user.model';

@Component({
  selector: 'app-developer-record',
  templateUrl: './developer-record.component.html',
  styleUrls: ['./developer-record.component.css']
})
export class DeveloperRecordComponent implements OnInit {

  urlToReturn = '';
  personalInfo: PersonalInformation;
  developer: Developer;
  contact: Contact;
  users: User[];
  stages: any[];
  constructor(private developerService: DeveloperService,
              private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.urlToReturn = '/' + activeRoute.snapshot.parent.url[0].toString();

    this.userService.getUsers().subscribe(response => this.users = response);


    developerService.getDeveloperInfo(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.personalInfo = response
          ,
          error =>
            this.router.navigate([this.urlToReturn, 'error']));

      this.developerService.getDeveloper(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
            this.developer = response;
            if (this.developer.resource) {
              this.router.navigate(['/resources/edit', this.developer.reference]);
            }
          }
          , error =>
            this.router.navigate(['/developers', 'error']));

      this.developerService.getDeveloperContact(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
            this.contact = response;
            if (this.developer.resource) {
              this.router.navigate(['/resources/edit', this.developer.reference]);
            }
          }
          , error =>
            this.router.navigate(['/developers', 'error']));


  }


  ngOnInit() {
    this.stages = [
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Attente qualif manager', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];
  }

}
