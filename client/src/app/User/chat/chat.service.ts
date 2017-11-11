import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { config } from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
@Injectable()
export class ChatService {
    constructor(private http:Http) { }
/*=================fetch data====================*/
    fetch(answer:any):Observable<any>  {
        let url = config.ip+urlConfig.UserChatfetch;
        let userData = JSON.parse(localStorage.getItem('Userdata')).data;
        let email : string = userData.email;
        return this.http
        .post(url,{message:answer, email : email})
        .map((res:Response)=> {
            return res.json()
        })
    }
    
/*=================Sentiment analysis====================*/
    getSentiment(plan):Observable<any>{
  let sentimentUrl=config.ip+urlConfig.UserChatgetSentiment;
     return this.http.post(sentimentUrl,{plan}).map((res)=>{
         
         return res.json();
     })
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
        })
    }
/*=================get unanswered quetions====================*/
    getquestions(question:any):Observable<any>{
    let url:any = config.ip+urlConfig.UserChatgetquestions;
        let userData = JSON.parse(localStorage.getItem('Userdata')).data;
        let email : string = userData.email;
    return this.http.post(url,{question : question,email : email})
    .map((res:Response) =><any>res.json());
    }
/*=================trigger follow up quetions====================*/
    triggerfollowup(counter) : Observable<any> {
        let url = config.ip+urlConfig.UserChattriggerfollowup;
        return this.http
        .post(url,{counter : counter})
        .map((res:Response) => res.json());
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
        .map((res:Response) => res.json())
    }
/*=================check video and blog links====================*/
   checklink(answer:any):Observable<any>  {
    let url= config.ip+urlConfig.UserChatchecklink;
        return this.http
        .post(url,{message:answer})
        .map((res:Response)=> 
        res.json()
        )
    }
    unansweredquestion(answer){
        let url = config.ip+urlConfig.UserChatunansweredquestion;
            return this.http
        .post(url,{question : answer})
        .map((res:Response) => res.json());
    }
}


// import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable' ;
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import { config } from '../../config/app.config';
// import { urlConfig } from '../../config/url.config';

// @Injectable()
// export class ChatService {

// 	constructor(private http:Http) { }

// <<<<<<< HEAD

// 	fetch(answer:any):Observable<any>  { //fetch answers
// 		console.log("In Service " , answer);
// 		console.log(this.url);
// =======
// /*=================fetch data====================*/
// 	fetch(answer:any):Observable<any>  {
// 		let url = config.ip+urlConfig.UserChatfetch;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
// 		let email : string = userData.email;
// 		return this.http
// 		.post(url,{message:answer, email : email})
// 		.map((res:Response)=> {
// 			return res.json()
// 		})
// 	}

// <<<<<<< HEAD

// 	getSentiment(plan):Observable<any>{  //getting the sentiment
//   let sentimentUrl=config.ip+"/sentiment";
//      console.log(plan)
// =======
// /*=================Sentiment analysis====================*/
// 	getSentiment(plan):Observable<any>{
//   let sentimentUrl=config.ip+urlConfig.UserChatgetSentiment;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
//      return this.http.post(sentimentUrl,{plan}).map((res)=>{
         
//          return res.json();
//      })
//  }

// <<<<<<< HEAD

// 	forceLogout() { //forcing logout
// 		let url:any = config.ip+"/forceLogout";
// =======
// /*=================logout if abusive language is used===================*/
// 	forceLogout() {
// 		let url:any = config.ip+urlConfig.UserChatforceLogout;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
// 		let email : string = userData.email;
// 		return this.http
// 		.put(url,{email : email})
// 		.map((res:Response)=> {
// 			return res.json();
// 		})
// 	}

// <<<<<<< HEAD
// 	getquestions(question:any):Observable<any>{   //getting questions for history
// 		console.log("serviceeee",question)
// 	let url:any = config.ip+"/ques_ans";
// =======
// =================get unanswered quetions====================
// 	getquestions(question:any):Observable<any>{
// 	let url:any = config.ip+urlConfig.UserChatgetquestions;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
// 		let email : string = userData.email;
//     return this.http.post(url,{question : question,email : email})
//     .map((res:Response) =><any>res.json());
// 	}

// <<<<<<< HEAD
// 	triggerfollowup(counter) : Observable<any> {   //trigger followup question
// 		let url = config.ip+"/followup/selectfollow";
// =======
// /*=================trigger follow up quetions====================*/
// 	triggerfollowup(counter) : Observable<any> {
// 		let url = config.ip+urlConfig.UserChattriggerfollowup;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		return this.http
// 		.post(url,{counter : counter})
// 		.map((res:Response) => res.json());
// 	}

// <<<<<<< HEAD

// 	nextfollowup(countertype,question,answer):Observable<any> { //next followup
// =======
// /*=================follow up quetions====================*/
// 	nextfollowup(countertype,question,answer):Observable<any> {
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		let main = {
// 			countertype : countertype,
// 			question  : question,
// 			answer : answer
// 		}
// 		let url = config.ip+urlConfig.UserChatnextfollowup;
// 		return this.http.put(url,main)
// 		.map((res:Response) => res.json())
// 	}

// <<<<<<< HEAD
//    checklink(answer:any):Observable<any>  {   //checking the link
// 		console.log("In Service checklink " , answer);
// 		console.log(this.url+'/referlink');
// =======
// /*=================check video and blog links====================*/
//    checklink(answer:any):Observable<any>  {
//    	let url= config.ip+urlConfig.UserChatchecklink;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 		return this.http
// 		.post(url,{message:answer})
// 		.map((res:Response)=> 
// 	    res.json()
// 		)
// 	}
// <<<<<<< HEAD
// 	unansweredquestion(answer){  //getting unanswered
// 		console.log("answerrrr", answer)
// 		let url = config.ip+"/unques";
// =======
// 	unansweredquestion(answer){
// 		let url = config.ip+urlConfig.UserChatunansweredquestion;
// >>>>>>> dbdd982bd5b7a6744f77ef4d649143892e77f707
// 			return this.http
// 		.post(url,{question : answer})
// 		.map((res:Response) => res.json());
// 	}
// }


