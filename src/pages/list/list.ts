import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Employee } from '../employee';
import { EmployeeServiceProvider } from '../../providers/employee-service/employee-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string;
  employees: Array<Employee>;
  availableEmployees:number =0;
  totalEmployees:number = 0;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public EmployeeService: EmployeeServiceProvider ) {
    this.icons = 'person';

  }

  itemTapped(event, employee) {
    this.navCtrl.push(ItemDetailsPage, {
      employee:employee
    });
  }

  getEmployees() {
    this.EmployeeService.getEmployees()
                        .then(employees => {
                          this.employees = employees
                          this.employeeSummary();});
  }
  ionViewDidLoad(){
    this.getEmployees();
  }

  doRefresh(refresher) {
    this.EmployeeService.getEmployees()
    .then(employees =>  { 
      this.employees = employees
      refresher.complete(); 
    });    
  }

  employeeSummary() {
    this.totalEmployees = this.employees.length;

    for(var i=0;i< this.employees.length;i++){
        if(this.employees[i].availability === 'available')
          this.availableEmployees++;
    }
  }
}
