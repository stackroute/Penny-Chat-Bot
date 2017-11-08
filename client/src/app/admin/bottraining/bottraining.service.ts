import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import {config} from '../../config/app.config';
@Injectable()
export class BottrainingService {

  constructor(private http:Http) { }

  // server urls
  url:string=config.ip+"/train_intent/traindomain"
  url1:string=config.ip+"/train_intent/getIntent"
  url2:string=config.ip+"/train_intent/updateIntent"
  trainurl:string=config.ip+"/train_intent";
  suggesturl:string=config.ip+"/suggest";

  //getting all unanswered questions
  getunanswer():Observable<any>{
    let url:any = config.ip+"/unques";
    let userData = JSON.parse(localStorage.getItem('Userdata')).data;
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    })
  }

  //getting all the combinations of unanswered questions
  getQues(ques):Observable<any>{
    let Quesurl:any = config.ip+"/questoken";
    return this.http.post(Quesurl,{ques}).map((res)=>{
      return res.json();
    })
  }

  //getting all the intents present
  getIntent(){
    let url:any = config.ip+"/train_intent";
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    })
  }

  //getting all the context stored in database
  getContext(){
    let url:any = config.ip+"/train_intent/getContext";
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    })
  }

  /*================================Add Intent& Sentence====================*/
  addSentence(object): Observable<any> {
  	return this.http
  	.post(this.url, {object:object})
  	.map((res: Response)=>{
      return res.json()
    }
    )
  }

  /*============================Change Intent & Service======================*/
  changeIntent(object): Observable<any> {
  	return this.http
  	.put(this.url1,{object:object})
  	.map((res: Response)=>
      res.json()
      )
  }

  /*===========================Fetch Data in Service========================*/

  fetch(object): Observable<any> {
  	return this.http
  	.get(this.url2,object)
  	.map((res: Response)=>
      res.json()
      )
  }

  /*======================set synonym==========================*/

  setSynonym(intent,word): Observable<any> {
    let synUrl=config.ip+"/train_intent/setSynonym"

    return this.http
    .post(synUrl,{intent:intent,word:word})
    .map((res: Response)=>
      res.json()
      )
  }

  // adding synonyms of existing contexts
  contextSynonym(context,word): Observable<any> {
    let synUrl=config.ip+"/train_intent/contextsynonym";
    return this.http
    .post(synUrl,{context:context,word:word})
    .map((res: Response)=>{
      res.json()
    }
    
    )
  }

  // adding new question to database
  sendques(question){
    let synUrl=config.ip+"/unques"
    return this.http
    .post(synUrl,{question:question})
    .map((res: Response)=>
      res.json()
      )
  }

  /*==========================Start of Adds New Intent==============================*/
  addIntent(intent):Observable<any> {
    return this.http.post(this.trainurl,{data:intent})
    .map((res:Response)=>{
      return res.json();
    })
  }

  /*==========================Start of Add Intent's Synonym==============================*/
  addSynonym(data): Observable<any> {
    return this.http
    .put(this.trainurl,{data: data})
    .map((res: Response)=>{
      return res.json()
    })
  }

  // getting all the synonym of an intent
  getRelatedEntity(intentName:any){
    let url:any = config.ip+"/train_intent/getRelatedEntity";
    return this.http
    .post(url,{intentName})
    .map((res:Response) =>{
      return res.json();
    })
  }

  // adding more synonyms to existing intent
  addMoreSynonym(synonymname:any,intentName:any){
    let url:any = config.ip+"/train_intent/addSynonym";
    return this.http.post(url,{synonymname,intentName})
    .map((res:Response) =>{
      return res.json();
    })
  }

  // deletes existing synonym of an intent
  deleteSynonym(synonymname:any,intentname:any){
    let url:any = config.ip+"/train_intent/deleteSynonym";
    return this.http.put(url,{synonymname,intentname})
    .map((res:Response) =>{
      return res.json();
    })
  }  

  /*==========================Start of Suggest Synonym==============================*/
  suggest(data): Observable<any> {
    return this.http
    .put(this.suggesturl,{data: data})
    .map((res: Response)=>{
      return res.json().data
    })
  }

  /*=====================delete intent=========================*/

  deleteIntent(intent): Observable<any> {
    let deleteIntentUrl=config.ip+"/train_intent/deleteIntent";
    return this.http
    .put(deleteIntentUrl,{data: intent})
    .map((res: Response)=>{
      return res.json()
    })
  }

  /*=====================delete pending questions=========================*/

  deletePendingQuestions(ques): Observable<any> {
    let deletePendingQuestions=config.ip+"/unques/delete"
    return this.http
    .put(deletePendingQuestions,{ques: ques})
    .map((res: Response)=>{
      return res.json();
    })
  }

}