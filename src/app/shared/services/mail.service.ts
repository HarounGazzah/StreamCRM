import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Email} from '../entities/mail.model';

@Injectable()
export class MailService {

  constructor(private http: HttpClient) {
  }

  sendMail(mail: Email): Observable<Email> {
    const url = environment.API + '/ws/mail';
    return this.http.post<Email>(url, mail);
  }

}
