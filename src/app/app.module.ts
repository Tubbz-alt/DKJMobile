import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { OngoingTender } from '../pages/tabs/ongoing-tender';
import { TenderSummary } from '../pages/tabs/tender-summary';
import { ChatPage } from '../pages/chat/chat';
import { TenderDetailsPage } from '../pages/tender-details/tender-details';
import { Jobs } from '../pages/jobs/jobs';
import { DashboardPage }  from '../pages/dashboard/dashboard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TenderServiceProvider } from '../providers/tender-service/tender-service';
import {HttpModule} from '@angular/http';
import { EmployeeServiceProvider } from '../providers/employee-service/employee-service';
import { CallNumber } from '@ionic-native/call-number';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://192.168.8.101:8001', options: {} };



@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    OngoingTender,
    TenderSummary,
    TenderDetailsPage,
    Jobs,
    ChatPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    SocketIoModule.forRoot(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    OngoingTender,
    TenderSummary,
    TenderDetailsPage,
    Jobs,
    ChatPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TenderServiceProvider,
    EmployeeServiceProvider,
    TenderServiceProvider,
    CallNumber,
    FingerprintAIO   
  ]
})
export class AppModule {}
