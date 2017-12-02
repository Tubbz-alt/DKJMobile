import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-tender-details',
  templateUrl: 'tender-details.html'
})
export class TenderDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedItem.date = this.selectedItem.date.slice(0,10);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
