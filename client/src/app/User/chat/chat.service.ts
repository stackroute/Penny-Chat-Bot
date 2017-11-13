import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { config } from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import Config from './chat_en_config' 
@Injectable()
export class ChatService {
    constructor(private http:Http) { }
/*=================fetch data====================*/
    fetch(answer:any):Observable<any>  {
        let url = config.ip+urlConfig.UserChatfetch;
        let userData = JSON.parse(localStorage.getItem('Userdata'));
        let email : string = userData.userdata.email;
        return this.http
        .post(url,{message:answer, email : email})
        .map((res:Response)=> {
            return res.json()
        }).catch(this._errorHandler);
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
    
    
/*=================Sentiment analysis====================*/
    getSentiment(plan):Observable<any>{
  let sentimentUrl=config.ip+urlConfig.UserChatgetSentiment;
     return this.http.post(sentimentUrl,{plan}).map((res)=>{
         
         return res.json();
     }).catch(this.errorHandler);
  }

  /*error handling*/
  errorHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
/*=================logout if abusive language is used===================*/
    forceLogout() {
        let url:any = config.ip+urlConfig.UserChatforceLogout;
        let userData = JSON.parse(localStorage.getItem('Userdata')).data;
        let email : string = userData.email;
        return this.http
        .put(url,{email : email})
        .map((res:Response)=> {
            return res.json();
        }).catch(this.errorInHandler);
  }

  /*error handling*/
  errorInHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
    
/*=================get unanswered quetions====================*/
    getquestions(question:any):Observable<any>{
    let url:any = config.ip+urlConfig.UserChatgetquestions;
        let userData = JSON.parse(localStorage.getItem('Userdata'));
        let email : string = userData.userdata.email;
    return this.http.post(url,{question : question,email : email})
    .map((res:Response) =><any>res.json()).catch(this.errorGetHandler);
  }

  /*error handling*/
  errorGetHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  };
    
/*=================trigger follow up quetions====================*/
    triggerfollowup(counter) : Observable<any> {
        let url = config.ip+urlConfig.UserChattriggerfollowup;
        return this.http
        .post(url,{counter : counter})
        .map((res:Response) => res.json()).catch(this.errorTriggerHandler);
  }

  /*error handling*/
  errorTriggerHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
    
/*=================follow up quetions====================*/
    nextfollowup(countertype,question,answer):Observable<any> {
        let main = {
            countertype : countertype,
            question  : question,
            answer : answer
        }
        let url = config.ip+urlConfig.UserChatnextfollowup;
        return this.http.put(url,main)
        .map((res:Response) => res.json()).catch(this.errorNextHandler);
  }

  /*error handling*/
  errorNextHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
  
/*=================check video and blog links====================*/
   checklink(answer:any):Observable<any>  {
    let url= config.ip+urlConfig.UserChatchecklink;
        return this.http
        .post(url,{message:answer})
        .map((res:Response)=> 
        res.json()
        ).catch(this.errorCheckHandler);
  }

  /*error handling*/
  errorCheckHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
   

    /*=================check unanswer question====================*/
    unansweredquestion(answer){
        let url = config.ip+urlConfig.UserChatunansweredquestion;
            return this.http
        .post(url,{question : answer})
        .map((res:Response) => res.json()).catch(this.errorUnanswerHandler);
  }

  /*error handling*/
  errorUnanswerHandler(error: Response){
    return Observable.throw(error || Config.Server.errorhandle);
  }
    
}

