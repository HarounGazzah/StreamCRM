import {Society} from './society.model';

export class SocietyContact {

  reference: string;
  firstname: string;
  lastname: string;
  title: string;
  service: string;
  managerReference: string;
  societyReference: string;
  technicalScope: string;
  functionalScope: string;
  gender: string;
  stage: string;
  note: string;
  createdDate: Date;
  modifiedDate: Date;
}

export class SocietyContactView {

  reference: string;
  firstname: string;
  lastname: string;
  title: string;
  service: string;
  managerReference: string;
  societyReference: string;
  technicalScope: string;
  functionalScope: string;
  gender: string;
  stage: string;
  note: string;
  email1: string;
  email2: string;
  email3: string;
  tel1: string;
  tel2: string;
  tel3: string;
  fax: string;
  address: string;
  npa: string;
  city: string;
  country: string;
  website: string;
  createdDate: Date;
  modifiedDate: Date;
}
