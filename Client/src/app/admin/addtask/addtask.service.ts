import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {config} from '../../config/app.config';
@Injectable()
export class AddtaskService {

	constructor(private http:Http) { }

	Submit(data){
		let url = config.ip+"/addtask";
		return this.http
		.post(url,{message:data})
		.map((res:Response)=> {
			console.log("in response ",res.json());
			return res.json()
		})

	}
}