import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';


import {Tender} from '../tender/tender';
import { Jobs } from '../jobs/jobs' ;
import { TenderServiceProvider } from '../../providers/tender-service/tender-service';

@Component({
 templateUrl : "./ongoing-tender.html",
 
})
export class OngoingTender {

    tenders :Array<Tender> ;
    ongoing :number;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public modalCtrl: ModalController,
                public tenderService: TenderServiceProvider){
    }

    ionViewDidLoad() {
        this.tenderService.getOngoingTenders()
                            .then((tenders) => {
                                this.tenders = tenders;
                                this.ongoing  = this.tenders.length;
                            });
        
    }

    itemTapped(event, item) {
        
            let modal = this.modalCtrl.create(Jobs, {
              item: item
            });
            modal.present();
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
    
        this.tenderService.getOngoingTenders()
        .then((tenders) => {
            this.tenders = tenders;
            this.ongoing  = this.tenders.length;
            refresher.complete();
        });


      }
    
    
}