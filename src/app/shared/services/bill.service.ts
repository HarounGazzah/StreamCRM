import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Bill} from '../entities/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBillByReference(billReference: string): Observable<Bill> {

    const url = environment.API + '/ws/bills/one';
    const options = {params: new HttpParams().set('billReference', billReference)};
    return this.http.get<Bill>(url, options)
      ._finally(() => {
      });
  }


  updateBill(bill: Bill, reference: string): Observable<Bill> {
    const url = environment.API + '/ws/bills';
    const options = {params: new HttpParams().set('billReference', reference)};
    return this.http
      .put<Bill>(url, bill, options)
      ._finally(() => {
      });
  }

  deleteBill(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/bills';

    const options = {params: new HttpParams().set('billReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        // this.loaderService.hide();
      });
  }

  billsCount(): Observable<Bill> {
    const url = environment.API + '/ws/bills/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }

  billByType(billStage: string): Observable<Bill[]> {
    const url = environment.API + '/ws/bills/byType';
    const options = {params: new HttpParams().set('billStage', billStage)};
    return this.http.get<Bill[]>(url, options)
      ._finally(() => {
      });
  }
}
