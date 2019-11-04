import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SharingService {
  private messageSource = new BehaviorSubject('default');
  constructor() { }

  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string){
    this.messageSource.next(message);
  }
}
