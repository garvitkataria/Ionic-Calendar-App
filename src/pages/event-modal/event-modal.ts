import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
	event = {
		id:null,
		title:null,
		description:'',
		completed:false,
		startTime:new Date().toISOString(),
		endTime:new Date().toISOString(),
		allDay:false,
	}
	minDate = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController ) {
  	let preselectedDate = moment(this.navParams.get('selectedDay')).subtract(12, 'hour').add(1, 'minute').format();
  	let preselectedDate2 = moment(this.navParams.get('selectedDay')).add(12, 'hour').subtract(1, 'minute').format();
  	this.event.startTime = preselectedDate;
  	this.event.endTime = preselectedDate2;
  	this.minDate = preselectedDate;
  }
  save(){

  	console.log("This is the event",this.event.description);
  	this.viewCtrl.dismiss(this.event)
  }
}
