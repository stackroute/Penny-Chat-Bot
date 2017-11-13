import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Urls} from './login.config.url';
import {Config} from './multi_en_config';

@Injectable()
export class LoginService {
	//url:string = Url.signIn;
	url:string = Urls.signIn;	
	//server path for login
	constructor(private http:Http) { }

	//--------------------posting of user creadentials to express------------------------------- 
	loginUsers(loginDetails): Observable<any>{
		return this.http.post(this.url,loginDetails)
		.map((res:Response)=>res.json())
		.catch(this._errorHandler);
		//call _errorHandler if catching any error
	}

	_errorHandler(error: Response){
		//handle error from server
		return Observable.throw(error || Config.login.serverError)
	}
}