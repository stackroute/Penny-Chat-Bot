/*Preeti Singh
22/10/2017*/

import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import expressUrls from './urls';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Config } from './forgotpassword_en_config';

@Injectable()
export class ForgotpasswordService {

  constructor(private http:Http) { }

  forgotPassword(email:string){
  	return this.http
  	.post(expressUrls.forgotPassword,{email:email})
  	//post mailId to send mail on that particular id
  	.map((res:Response) => res.json())
  	.catch(this._errorHandler);
    //call _errorHandler() if any error is catched
  }

  _errorHandler(error: Response){
		return Observable.throw(error || Config.forgotpassword.serverError)
    //error handling 
	}
}
