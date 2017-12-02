import { Component } from '@angular/core';

import { OngoingTender } from '../tabs/ongoing-tender';
import { TenderSummary } from '../tabs/tender-summary';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  tab1Root : any;
  tab2Root : any;
  tab3Root : any;

  constructor() {
    this.tab1Root = OngoingTender ;
    this.tab2Root = TenderSummary ;
    this.tab3Root = DashboardPage ;
  }
}
