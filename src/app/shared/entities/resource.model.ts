import {User} from './user.model';


export class Resource {
  reference: string;
  firstname: string;
  lastname: string;
  registrationNumber: string;
  resourceType: string;
  resourceStage: string;
  note: string;
  managerReference: string;
  rhReference: string;
  availability: Date;
  gender: string;
  stage: string;
  mobility: string;
  createdDate: Date;
  modifiedDate: Date;
}

export class ResourceView {
  reference: string;
  firstname: string;
  lastname: string;
  registrationNumber: string;
  resourceType: string;
  resourceStage: string;
  stage: string;
  manager: User;
  rh: User;
  note: string;
  availability: Date;
  gender: string;
  mobility: string;
  createdDate: Date;
  modifiedDate: Date;
  placeOfBirth: string;
  birthDate: Date;
  nationality: string;
  socialSecurityNumber: string;
  familySituation: string;
  title: string;
  languages: string;
  qualifications: string[];
  experience: string;
  formation: string;
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
}

