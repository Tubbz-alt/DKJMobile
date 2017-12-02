import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { TenderDetailsPage } from '../tender-details/tender-details';
import { TenderServiceProvider } from '../../providers/tender-service/tender-service';
import { TenderSummary as TenderSummaryDetail } from '../tender-summary';


@Component({
 templateUrl : './tender-summary.html',
})
export class TenderSummary {
  items: Array<TenderSummaryDetail>;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public modalCtrl: ModalController, 
               public TenderService: TenderServiceProvider) {    
  }

  ionViewDidLoad() {
    this.TenderService.getTenders()
                      .then( tenders => {
                        this.items = tenders;
                      });
  }

  itemTapped(event, item) {

    let modal = this.modalCtrl.create(TenderDetailsPage, {
      item: item
    });
    modal.present();
  }

  doRefresh(refresher) {

    this.TenderService.getTenders()
    .then( tenders => {
      this.items = tenders;
      refresher.complete();
    });


  }

}