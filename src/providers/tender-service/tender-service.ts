import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Tender } from '../../pages/tender/tender';
import { TenderSummary } from '../../pages/tender-summary';

@Injectable()
export class TenderServiceProvider {
  host = "http://192.168.8.101:8001";
  url = 'http://192.168.8.101:8001/api/';

  constructor(public http: Http) {
    console.log('Hello TenderServiceProvider Provider');
  }

  getOngoingTenders(): Promise<Tender[]> {
    return this.http.get(this.url+'tenders/ongoing')
                    .toPromise()
                    .then(response => response.json() as Tender[])
                    .catch(this.handleError);
  }

  getTenders(): Promise<TenderSummary[]>{
    return this.http.get(this.url+'tenders/all')
                    .toPromise()
                    .then(response => response.json() as TenderSummary[])
                    .catch(this.handleError);
  }

  getJobs(id:string){
    return this.http.get(this.url+'tenders/tenderjob/'+id)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  getMessages(name:string){
    return this.http.get(this.url+'tenders/messages/'+name)
                    .toPromise()
                    .then(response =>response.json())
                    .catch(this.handleError);
  }

  getCount(){
    return this.http.get(this.url+'tenders/count')
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  getUtilitiesMonth() {
    return this.http.get(this.url+'tenders/utilities/monthly_expense')
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  getUtilititesYear() {
    return this.http.get(this.url+'tenders/utilities/years')
                    .toPromise()
                    .then(res => res.json())
                    .catch(this.handleError);
  }

  getUtilitiesYearMonth(year:number) {
    return this.http.get(this.url+'tenders/utilities/month/'+year)
                    .toPromise()
                    .then(res => res.json())
                    .catch(this.handleError);
  }

  getUtilitiesTypeCost(year:number,month:number) {
    return this.http.get(this.url+'tenders/utilities/typecost/'+year+'/'+month)
                    .toPromise()
                    .then(res => res.json())
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }


}
