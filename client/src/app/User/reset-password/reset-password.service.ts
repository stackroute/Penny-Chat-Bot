import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Config } from './../../config/multi_en_config';
import { config } from '../../config/app.config';
import { urlConfig } from '../../config/url.config';

@Injectable()
export class ResetPasswordService {

  constructor(private http:Http) { }

  /*resetpassword to get the token from the local storage*/
  resetpassword(userdata:any,newpassword:any):Observable<any>{
    console.log('hey', userdata)
     let url = config.ip+urlConfig.UserResetPasswordfetch+userdata.email;

    //const tokenJWT = JSON.parse(localStorage.getItem(Config.userResetPassword.localstorage)).token;
    //let headers = new Headers({'Authorization' : tokenJWT});
    //const reseturl="http://localhost:8000/reset_password/"+userdata.email;
    return this.http
    .put(url,newpassword)
    .map((res:Response)=>{
      return <any[]>res.json();
    })
    .catch(this._errorHandler);
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.userResetPassword.errorhandle);
  }

}