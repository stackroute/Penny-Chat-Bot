import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {expressUrl} from './url';
import 'rxjs/add/operator/map';
import {Config} from './register_en_config'

@Injectable()
export class RegisterService { //register service 

  constructor(private http:Http) { }
  post(data:any){
  	
  	return this.http.post(expressUrl.loginUrl,data)

  		.map((res)=> <any>res.json()).catch(this._errorHandler);
    //call _errorHAndle() on catching error 
	}

	_errorHandler(error: Response){
    //error handling
		return Observable.throw(error || Config.signup.ServerError)
	};

  
}
  