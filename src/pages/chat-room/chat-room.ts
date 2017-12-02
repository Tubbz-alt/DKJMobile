import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

import { TenderServiceProvider } from '../../providers/tender-service/tender-service';

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  prevMessages: any[] = [];
  messages: any[] = [];
  message: string = '';
  name: string;
  @ViewChild('scroll') scroll;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private socket: Socket,
              private tenderService: TenderServiceProvider) {

    this.name = this.navParams.get('name');
    this.getMessages().subscribe( (msg) => {this.messages.push(msg);});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
    
   
    this.getPreviousMessages(this.name);
  }

  ionViewWillLeave() {
    this.socket.emit('leave',this.name);
    this.socket.disconnect();
  }

  getMessages() {
      let observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          observer.next(data);
          console.log(data);
        });
      });
      return observable;
  }

  getPreviousMessages(name) {
    this.tenderService.getMessages(name).then(result => this.prevMessages = result);
  }

  sendMessages() {
    this.socket.emit('message',{ messages : this.message,
                                 room : this.name,
                                 sender: 'boss',
                                 receiver: this.name });
  this.message = '';                                
  }

}
