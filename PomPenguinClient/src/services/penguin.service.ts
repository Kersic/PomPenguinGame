import {Injectable} from '@angular/core'
import {Http} from '@angular/http'


//import { HTTP } from '@ionic-native/http';
//import {Observable} from 'rxjs/Rx'
import 'rxjs/Rx'

@Injectable()
export class Service{
	http:any;
	baseUrl: String;

	

	constructor(http:Http){
		this.http= http;
		this.baseUrl = 'https://black-dolphin-73.localtunnel.me';
		//this.baseUrl = 'http://localhost:3000';

		//this.baseUrl = 'https://penguintriathlon.herokuapp.com';
	}

	getService(ruter, api){
		//console.log("Poslan token "+window.localStorage.token);
		var header = { "headers": {"Authorization":"Bearer "+window.localStorage.token,"Content-Type": "application/json", "withCredentials": "true" } };
		return this.http.get(this.baseUrl+ruter+api, header).map(res => res.json());
		//return this.http.get(this.baseUrl+'/food/top.json?limit=5').map(res => res.json());
	}

	postService(ruter, api, data){
		
		var header = { "headers": {"Authorization":"Bearer "+window.localStorage.token,"Content-Type": "application/json",  "withCredentials": "true"} };
		return this.http.post(this.baseUrl+ruter+api, data, header)
		.map(res => res.json())
	}

}
