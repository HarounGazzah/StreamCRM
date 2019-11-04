import {User} from './user.model';
import {SocietyContact} from './society-contact.model';

export class Need {

  reference: string;
  title: string;
  managerReference: string;
  rhReference: string;
  societyReference: string;
  societyContactReference: string;
  type: string;
  stage: string;
  note: string;
  createdDate: Date;
  modifiedDate: Date;
}

export class NeedInformation {
  needReference: string;
  activityArea: string;
  place: string;
  durationByMonth: number;
  currency: string;
  budget: number;
  startingDate: Date;
  responseDate: Date;
  closingDate: Date;

}

export class NeedView {

  reference: string;
  title: string;
  manager: User;
  rh: User;
  client: string;
  societyName: string;
  societyContact: SocietyContact;
  type: string;
  stage: string;
  note: string;
  activityArea: string;
  place: string;
  durationByMonth: number;
  currency: string;
  budget: number;
  startingDate: Date;
  responseDate: Date;
  closingDate: Date;
  createdDate: Date;
  modifiedDate: Date;
}
