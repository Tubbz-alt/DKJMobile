import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import { TenderServiceProvider} from '../../providers/tender-service/tender-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  year :number[] = [];
  yearCount :number[] = [];
  utilitiesTotal :number[] = [];
  utilitiesMonth :number[] = [];
  monthName :string[];
  utilitiesMonthName : string [] = [];
  utilitiesYear :any[] = [];
  utilitiesYearMonth :any[] = [];
  utilitiesTypeLabel :string[] =[];
  utilitiesTypeTotal :number[] =[];
  selectedYear :number;
  selectedMonth :number;
  pieColors : string[] =[];

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  lineChart :any;
  barChart :any;
  pieChart :any;

  data = {
    labels : this.year,
    datasets: [
      {
          label: "Tenders",
          fill: false,
          
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.yearCount,
          spanGaps: true,
      }
  ]
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public TenderService: TenderServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');

    this.monthName = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    this.TenderService.getUtilititesYear().then(res => this.utilitiesYear = res);

    this.getYearCount().then(()=>{
        this.lineChart = new Chart(this.lineCanvas.nativeElement,{
            type : 'line',
            data : this.data,
          });
    });

    this.getMonthlyUtilities().then(()=>{
        this.barChart= new Chart(this.barCanvas.nativeElement,{
            type : 'bar',
            data: {
              labels: this.utilitiesMonthName,
              datasets: [{
                  label: 'Month',
                  data: this.utilitiesTotal,
                  backgroundColor : 'rgba(0,0,0,0.2)',
                  borderColor : 'rgba(0,0,0,1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
          });
    });
    

    
  }

  getYearCount () {
    return this.TenderService.getCount().then(result => {
        for(let r in result) {
            this.year.push(result[r].year);
            this.yearCount.push(result[r].total);
        }
    });
  }

  getMonthlyUtilities() {
      return this.TenderService.getUtilitiesMonth().then((utilities)=>{
        for(let u in utilities ) {
            if(utilities[u].year == '2017'){
                this.utilitiesMonthName.push(this.monthName[utilities[u].month]);
                this.utilitiesTotal.push(utilities[u].total);
            }
        }
      });
  }

  selectMonth($event) {
      this.TenderService.getUtilitiesYearMonth(this.selectedYear).then(res => this.utilitiesYearMonth = res);
  }

  getTypeCost(){
      this.TenderService.getUtilitiesTypeCost(this.selectedYear,this.selectedMonth)
                        .then((result) => {
                            this.utilitiesTypeLabel = [];
                            this.utilitiesTypeTotal = [];
                            this.pieColors = [];
                            
                            for(let r in result) {
                                this.utilitiesTypeLabel.push(result[r].billType);
                                this.utilitiesTypeTotal.push(result[r].total);
                                this.pieColors.push(this.dynamicColors());
                            }

                            this.pieChart = new Chart(this.pieCanvas.nativeElement,{
                                type:'pie',
                                data : {
                                    labels : this.utilitiesTypeLabel,
                                    datasets : [{ data: this.utilitiesTypeTotal ,
                                                  backgroundColor : this.pieColors}],
                                    
                                },
                                options : {
                                    cutoutPercentage : 0
                                }
                            });
                         });
  }

  dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

 doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.TenderService.getUtilititesYear().then(res => this.utilitiesYear = res);
    
        // this.getYearCount().then(()=>{
        //     this.lineChart = new Chart(this.lineCanvas.nativeElement,{
        //         type : 'line',
        //         data : this.data,
        //       });
        //       refresher.complete();
        // });
        // .then(()=>{
        //     this.getMonthlyUtilities().then(()=>{
        //         this.barChart= new Chart(this.barCanvas.nativeElement,{
        //             type : 'bar',
        //             data: {
        //               labels: this.utilitiesMonthName,
        //               datasets: [{
        //                   label: 'Month',
        //                   data: this.utilitiesTotal,
        //                   backgroundColor : 'rgba(0,0,0,0.2)',
        //                   borderColor : 'rgba(0,0,0,1)',
        //                   borderWidth: 1
        //               }]
        //           },
        //           options: {
        //               scales: {
        //                   yAxes: [{
        //                       ticks: {
        //                           beginAtZero:true
        //                       }
        //                   }]
        //               }
        //           }
        //           });
        //     });
            
        // });
        refresher.complete();
        
  }

}
