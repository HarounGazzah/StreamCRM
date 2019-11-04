import {Component, OnInit} from '@angular/core';
import {DeveloperService} from '../../shared/services/developer.service';
import {AbsenceService} from '../../shared/services/AbsenceService';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-absence-count',
  templateUrl: './absence-count.component.html',
  styleUrls: ['./absence-count.component.css']
})
export class AbsenceCountComponent implements OnInit {
  devoloper: any;
  actuelDate = new Date();
  countMonths: any;

  constructor(private developerService: DeveloperService,
              private  absenceService: AbsenceService,
              private userService: UserService) {
  }





  ngOnInit() {
    this.loadDeveloper();


    return this.developerService.getCurrentLeave().subscribe(res => {
      console.log(res);
      this.countMonths = res ;
    });
  }

  loadDeveloper() {
    return this.developerService.getCurrentDeveloper().subscribe((data: {}) => {
      this.devoloper = data;

    });
  }



}
