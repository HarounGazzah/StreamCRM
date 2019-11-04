import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contract} from '../entities/contract.model';
import {WishedContract} from '../entities/wished-contract.model';
import {HttpClient, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";


@Injectable()
export class ContractService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getContract(reference: string): Observable<Contract> {

    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<Contract>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });

  }

  createContracts(contract: Contract, reference: string): Observable<Contract> {

    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http
      .post<Contract>(url, contract, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  updateContract(contract: Contract, reference: string): Observable<Contract> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Contract>(url, contract, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  deleteContract(reference: string): Observable<any> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete<any>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }

  getWishedContract(reference: string): Observable<WishedContract> {

    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this
      .http
      .get<WishedContract>(url, options)
      ._finally(() => {
        //this.loaderService.hide();
      });

  }

  updateWishedContract(wishedContract: WishedContract, reference: string): Observable<WishedContract> {
    //this.loaderService.show();
    const url = environment.API + '/ws/developers/contract/wished';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<WishedContract>(url, wishedContract, options)
      ._finally(() => {
        //this.loaderService.hide();
      });
  }
}

