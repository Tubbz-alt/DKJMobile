import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { TenderServiceProvider } from '../../providers/tender-service/tender-service';

@Component({
    templateUrl : './jobs.html'
})
export class Jobs 
{
    selectedItem: any;
    assets :string[];
    employees :string[];
    equipments :string[];
    materials :string[];
    materialsCost :number = 0;
    remainingDay :number;
    ellapsedDays: number;
    assignedDate :any;


    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public modalCtrl: ModalController,
                public viewCtrl: ViewController,
                public tenderService: TenderServiceProvider) {

        this.selectedItem = navParams.get('item');

    }

    ionViewDidLoad() {
        this.tenderService.getJobs(this.selectedItem.tenderId)
                            .then(result => {                                
                                this.assets =result[0];
                                this.employees = result[1];
                                this.equipments = result[2];
                                this.materials = result[3];
                                this.remainingDays(this.selectedItem.date,this.selectedItem.period);

                                for(let m in this.materials) {
                                    console.log(m);
                                    this.materialsCost += (this.materials[m]['price'] * this.materials[m]['assignCount']);
                                    console.log(this.materialsCost);
                                }
                            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
      }

    remainingDays(assignedDate:any,period:any) {
        var today:any = new Date();
        let assDate = assignedDate.slice(0,10).replace(/-/g,'/')
        assignedDate = new Date(assDate);
        var diff:any = Math.abs(today - assignedDate);
        diff = Math.ceil(diff / (1000 * 3600 * 24)); 
        let remaining = period-diff;
        this.ellapsedDays = diff;
        this.remainingDay = remaining;
        this.assignedDate = assDate;
    }
}