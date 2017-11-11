import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {expressUrl} from './url';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService { //register service 

  constructor(private http:Http) { }
  post(data:any){
  	
  	return this.http.post(expressUrl.loginUrl,data)

  		.map((res)=> <any>res.json());

  }
}
  