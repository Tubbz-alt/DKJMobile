import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ChatPage } from '../pages/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  
  rootPage; 
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private faio: FingerprintAIO
  ) {
    
    this.fingerprint().then(() => {
      this.rootPage = HelloIonicPage;
      this.initializeApp();
    });
    // set our app's pages
    this.pages = [
      { title: 'Tender', component: HelloIonicPage },
      { title: 'Employees', component: ListPage },
      { title: 'Messages', component:ChatPage}
    ];
  }

  initializeApp() {
    
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#2462D0');
        this.splashScreen.hide();
        
        
      });
    
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

 

  fingerprint() {
    
   return this.faio.show({
      clientId: 'user',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:false,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
  })
  .then((result: any) => {
    console.log(result);
    if(result == 'Cancelled'){
      this.platform.exitApp();
    }
                
  })
  .catch((error: any) => {
    if(error == 'Cancelled'){
      this.platform.exitApp();
    }
  });
  }

  
}
