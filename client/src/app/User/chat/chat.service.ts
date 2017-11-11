import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { config } from '../../config/app.config';
@Injectable()
export class ChatService {

	url:any = config.ip+"/answerbot";

	constructor(private http:Http) { }


	fetch(answer:any):Observable<any>  { //fetch answers
		console.log("In Service " , answer);
		console.log(this.url);
		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
		let email : string = userData.email;
		return this.http
		.post(this.url,{message:answer, email : email})
		.map((res:Response)=> {
			console.log("in response ",res.json());
			return res.json()
		})
	}


	getSentiment(plan):Observable<any>{  //getting the sentiment
  let sentimentUrl=config.ip+"/sentiment";
     console.log(plan)
     return this.http.post(sentimentUrl,{plan}).map((res)=>{
         
         console.log('service. ',res);
         return res.json();
     })
 }


	forceLogout() { //forcing logout
		let url:any = config.ip+"/forceLogout";
		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
		let email : string = userData.email;
		return this.http
		.put(url,{email : email})
		.map((res:Response)=> {
			console.log("in response ",res);
			return res.json();
		})
	}

	getquestions(question:any):Observable<any>{   //getting questions for history
		console.log("serviceeee",question)
	let url:any = config.ip+"/ques_ans";
		let userData = JSON.parse(localStorage.getItem('Userdata')).data;
		let email : string = userData.email;
    return this.http.post(url,{question : question,email : email})
    .map((res:Response) =><any>res.json());
	}

	triggerfollowup(counter) : Observable<any> {   //trigger followup question
		let url = config.ip+"/followup/selectfollow";
		return this.http
		.post(url,{counter : counter})
		.map((res:Response) => res.json());
	}


	nextfollowup(countertype,question,answer):Observable<any> { //next followup
		let main = {
			countertype : countertype,
			question  : question,
			answer : answer
		}
		console.log("nex follow up",main);
		let url = config.ip+"/followup";
		return this.http.put(url,main)
		.map((res:Response) => res.json())
	}

   checklink(answer:any):Observable<any>  {   //checking the link
		console.log("In Service checklink " , answer);
		console.log(this.url+'/referlink');
		return this.http
		.post(this.url+'/referlink',{message:answer})
		.map((res:Response)=> 
	    res.json()
		)
	}
	unansweredquestion(answer){  //getting unanswered
		console.log("answerrrr", answer)
		let url = config.ip+"/unques";
			return this.http
		.post(url,{question : answer})
		.map((res:Response) => res.json());
	}
}


