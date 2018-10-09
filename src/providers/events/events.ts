import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public http: Http) {
    console.log('Hello DjangoProvider Provider');
  }
	get eventsOfTheCalendar()
  	{
  		return(this.http.get("http://ashi123321.pythonanywhere.com/events/"));
 	}

 	AddEventInDb(data: any) {
        return this.http.post('http://ashi123321.pythonanywhere.com/events/', data);
    }
    deleteEvent(data: any,headers:any){
    	 return this.http.put('http://ashi123321.pythonanywhere.com/events/'+data.id+'/',data,{ headers: headers });
    }
}
