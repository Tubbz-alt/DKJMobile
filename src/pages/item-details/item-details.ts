import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('employee');
    this.selectedItem.dob = this.selectedItem.dob.slice(0,10);
    
  }

 makeCall(number) {
  this.callNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }
}
