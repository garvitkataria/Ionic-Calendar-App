import { Component } from '@angular/core';
import { NavController, ModalController, AlertController} from 'ionic-angular';
import * as moment from 'moment';
import  {EventsProvider} from '../../providers/events/events';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import  {EventManagerPage} from '../../pages/event-manager/event-manager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	eventSource =[];
  	viewTitle:string;
  	selectedDay = new Date();
  	calendar = {
  		mode: 'month',
  		currentDate: this.selectedDay
  	}
  	x:any;

  	data={
  		id:'',
  		description:'',
		// completed:'',
  		title:'',
  		startTime:'',
  		endTime:'',
  		allDay:''
  	}
  	z:any;
  constructor(public navCtrl: NavController, private modalCtrl:ModalController, private alertCtrl: AlertController, private eventsProvider:EventsProvider,private storage: Storage) {
  		storage.get('eventSourceStored').then((val) => {
		    console.log('Your age is', val);
		  });
  		this.eventsProvider.eventsOfTheCalendar.subscribe(
  		res=>{
  			this.storage.get('eventSourceStored').then((val) => {
			    console.log('Your age is', val);
			    let eventData=val;
			

  			
  			console.log(res);
  			this.x=JSON.stringify(res);

  			this.x = res.json();
  			console.log("X",this.x);
  			// for (var i = this.x.length - 1; i >= 0; i--) {
  			// 	val = this.x[i];
	  		// 	val.startTime = new Date();
	  		// 	val.startTime = this.x[i].startTime;
	  		// 	console.log("KKK",this.x[i].startTime);
	  		// 	val.endTime = new Date(JSON.stringify(this.x[i].endTime));
	  		// 	// val.endTime = this.x[i].endTime;
  			// 	this.eventSource.push(val);
  			// }
  			// console.log(this.x);
  	 		});


  		},
    	(error) => {
        	console.log(error);
       	}
    );

  }
  addEvent(){
  	let modal = this.modalCtrl.create('EventModalPage', {selectedDay:this.selectedDay});
  	modal.present();

  	modal.onDidDismiss(data =>{
  		if(data){
  			let eventData=data;

  			eventData.startTime = new Date(data.startTime);
  			eventData.endTime = new Date(data.endTime);

  			

  			// console.log("YO",data.startTime);
  			// console.log("ko",JSON.stringify(data.startTime));

  			this.data.title = eventData.title;
  			this.data.startTime = JSON.stringify(eventData.startTime);
  			this.data.endTime = JSON.stringify(eventData.endTime);
  			this.data.allDay = eventData.allDay;
			this.data.description = eventData.description;

  			let events = this.eventSource;
  			events.push(eventData);
  			this.eventSource = [];
  			setTimeout(()=>{
  				this.eventSource=events; 
  				console.log("Final test before sending",this.data)
  				this.eventsProvider.AddEventInDb(this.data).subscribe(
			      (response) => console.log(response),
			      (error) => console.log(error)
			      );
  				this.storage.set('eventSourceStored', eventData);

	  			this.storage.get('eventSourceStored').then((val) => {
			    console.log('Your age is', val);
		  });
  			});
  			// this.storage.remove('eventSourceStored');
  			
  		}
  	});
  }

  onViewTitleChanged(title){
  	this.viewTitle=title;
  	console.log(this.viewTitle);
  }

  onTimeSelected(en){
  	this.selectedDay = en.selectedTime;
  	console.log(this.selectedDay);
  	console.log(this.eventSource);
  }

  onEventSelected(event){
  	let start = moment(event.startTime).format('LLLL');
  	let end = moment(event.endTime).format('LLLL');

  	let alert = this.alertCtrl.create({
  		title: '' + event.title,
  		subTitle: 'From: ' + start +'<br>To: ' + end,
  		buttons:['OK']
  	})
  	console.log(alert);
  	alert.present();
  }

  EventManager(){
  	console.log("Event Manager");
  	this.navCtrl.push(EventManagerPage);
  }
}
