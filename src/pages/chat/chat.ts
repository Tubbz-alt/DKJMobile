import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { EmployeeServiceProvider } from '../../providers/employee-service/employee-service';
import { User } from '../user';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  users :Array<User>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socket: Socket,
              private EmployeeService: EmployeeServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.EmployeeService.getUsers()
                        .then(users => {this.users = users});
  }

  joinChat(name){
    this.socket.connect();
    this.socket.emit('join',name);
    this.navCtrl.push('ChatRoomPage',{ name : name});
  }

}
