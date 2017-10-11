import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { BackgroundMode,BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { Dialogs } from '@ionic-native/dialogs';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*constructor(public navCtrl: NavController) {

  }*/
  
  //constructor(public navCtrl: NavController,private iab: InAppBrowser) { } ngOnInit(){ const browser = this.iab.create('https://www.techiediaries.com','_self',{location:'no'}); }

  
   couter: number = 0;
  
   config: BackgroundGeolocationConfig = {
            desiredAccuracy: 0,
            stationaryRadius: 5,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
			url:'http://mockbin.org/bin/6d627d1f-df04-4305-9772-db4fcbdb435c'
    };
  
  constructor(private backgroundMode: BackgroundMode,private dialogs: Dialogs,private backgroundGeolocation: BackgroundGeolocation,private localNotification: PhonegapLocalNotification) {
	  
	  this.localNotification.requestPermission().then(
	  (permission) => {
		if (permission === 'granted') {

		  // Create the notification
		  this.localNotification.create('My Title', {
			tag: 'message1',
			body: 'My body',
			icon: 'assets/icon/favicon.ico'
		  });

		}
	  }
	);
	  
	  
	  this.dialogs.alert('Hello world')
  .then(() => console.log('Dialog dismissed'))
  .catch(e => console.log('Error displaying dialog', e));
	  console.log("in constructor2");
	 
	 
  /*this.backgroundMode.on((event:string) => {console.log("started");
  
  this.dialogs.alert('background'+e)
  .then(() => console.log('Dialog dismissed'))
  .catch(e => console.log('Error displaying dialog', e));
  
  });*/
  /*const config2: BackgroundModeConfiguration = {
            title: "My BackgroundMode",
            ticker: "My BackgroundMode"
           
    };
  
	
  
		this.backgroundMode.configure(config2);*/
	  this.backgroundMode.enable();
	  

	
	
	this.backgroundGeolocation.configure(this.config)
  .subscribe((location: BackgroundGeolocationResponse) => {
	  this.couter = this.couter+1;
	  
	  this.localNotification.create('My Title', {
			tag: 'message1'+new Date().getTime(),
			body: 'My body'+new Date().getTime(),
			icon: 'assets/icon/favicon.ico'
		  });
	  
	
   this.config.notificationTitle = this.couter+"";
  this.backgroundGeolocation.configure(this.config);
    console.log(location);
	this.dialogs.alert('location'+location)
  .then(() => console.log('Dialog dismissed'))
  .catch(e => console.log('Error displaying dialog', e));
	  console.log("in constructor2");

    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    this.backgroundGeolocation.finish(); // FOR IOS ONLY

  });

// start recording location
this.backgroundGeolocation.start();

// If you wish to turn OFF background-tracking, call the #stop method.
//this.backgroundGeolocation.stop();
  }
  
  

}
