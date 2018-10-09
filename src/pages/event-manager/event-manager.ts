import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  {EventsProvider} from '../../providers/events/events';
import { Http,Headers } from '@angular/http';

/**
 * Generated class for the EventManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-manager',
  templateUrl: 'event-manager.html',
})
export class EventManagerPage {
	data={
		id:'',
  		title:'',
  		description:'',
		completed:'',
  		startTime:'',
  		endTime:'',
  		allDay:''
  	}
	eventSource=[];
	searchQuery: string = '';
  	items: string[];
  	listOfSearchedItems=[]
  	length:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private eventsProvider:EventsProvider) {

  	this.length=0
  	this.eventsProvider.eventsOfTheCalendar.subscribe(
  		res=>{
  			console.log(res);
  			const x = res.json();
  			
  			console.log("tetst1",x);
  			for (var i = x.length - 1; i >= 0; i--) {
  				this.data = x[i];
	  			// this.data.startTime = JSON.stringify(x[i].startTime);
	  			// this.data.endTime = JSON.stringify(x[i].endTime);
	  			// this.data.allDay = x[i].allDay;
	  			console.log("tetst3",this.data);

  				this.eventSource.push(this.data);
  				console.log("tetst",this.eventSource);
  			}
  			console.log("tetst",this.eventSource);

  		},
    	(error) => {
        	console.log(error);
       	}
    );
  	this.initializeItems();
  	this.listOfSearchedItems = this.eventSource;
  }

   initializeItems() {
    this.items = this.eventSource;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventManagerPage');
  }
  doneEvent(event)
  {

  	console.log('Delete Event:',event);
  	const headers = new Headers({ 'Content-Type': 'application/json' });
  	event.completed=true;
  	this.eventsProvider.deleteEvent(event,headers).subscribe(
			      (response) => console.log(response),
			      (error) => console.log(error)
			      );
  }
	// onCancel(ev: any)
	// {
	// 	console.log('HI');
	// 	this.listOfSearchedItems = this.eventSource;

	// }
  getItems(ev: any) {
  	// console.log("getItems",ev);
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.searchQuery=val;
    console.log("getItems",this.searchQuery);

    if(val.length>=this.length)
    {
    	this.listOfSearchedItems=[]
    }
    else
    {
    	this.length=val.length
    }
    if(val.length==0)
    {
    	this.listOfSearchedItems = this.eventSource;
    }

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
      		const y = JSON.stringify(item);
      		console.log("Item",y);
      		console.log(y.split(',')[6].slice(9, -2));
      		const z = y.split(',')[6].slice(9, -2);

          if(JSON.stringify(z).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
          {
          	console.log(item);
          	this.listOfSearchedItems.push(item);
          }
      });
    }
    
  }

}
